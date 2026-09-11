import React, { useState } from "react";
import authoService from "../appwrite/Autho";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Login from "./LLogin";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { regiser, HandleSubmit } = useForm();

  const createS = async (data) => {
    setError(" ");

    try {
      const userData = await authoService.createAccount(data);
      if (userData) {
        const userData = await authoService.getCurrentUser();

        if (userData) {
          dispatch(Login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.meassage);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25">logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={HandleSubmit(createS)}>
          <div className="space-y-5">
            <Input
              label="full name"
              placeholder=" Enter your full Name"
              {...regiser("name", {
                required: ture,
              })}
            />

            <Input
              label="Email:"
              placeholder=" enter your Email"
              type="email"
              {...regiser("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

  <Input
  label="Password:"
  placeholder="Enter your password"
  type="password"
  {...regiser("password", {
    required: true,
    
  })}
/> 
           <Button
            type = "submit"
            className= "w-full"
           
           >Create Account</Button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
