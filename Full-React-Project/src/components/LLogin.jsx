import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { login as authLogin } from "../store/AuthSlice";
import authoService from "../appwrite/Autho";

import { Button, Input } from "./index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authoService.login(data);

      if (session) {
        const userData =
          await authoService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(
        error?.message || "Unable to login."
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block">
            Logo
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-8 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(login)}
          className="mt-8"
        >
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters",
                },
              })}
            />

            <Button
              type="submit"
              className="w-full hover: cursor-pointer  "
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;