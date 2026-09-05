import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as AuthLogin } from "../store/AuthSlice";
import { Button, Input } from "./index";

import { useDispatch } from "react-redux";
import authoService, { AuthService } from "../appwrite/Autho";

import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authoService.login(data);

      if (session) {
        const userdata = await authoService.getCurrentUser();

        if (userdata) {
          dipatch(AuthLogin(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-25  "> logo </span>
        </div>
        <h2>Sign in to your account</h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

{error &&<p className="text-red-600 mt-8 text-center">{error}</p>}
          
           <form   onSubmit={handleSubmit(login)} className="mt-8" >

            <div className="space-y-5"  >
                <Input
                label = "Email:"
                placeholder =" enter your Email"  
                type ="email"
                {...register("email" , {
                    required : true ,
                    validate : {
                        matchPattern: (value) =>
  /\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(value) ||
  "Email address must be a valid address"
                    }
                })}
                
                />


                 <Input
  label="Password:"
  placeholder="Enter your password"
  type="password"
  {...register("password", {
    required: true,
    validate: {
      matchPattern: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
        "Password must be at least 8 characters with uppercase, lowercase, number and special character"
    }
  })}
/>          
                <Button 
                type="submit"
                
                >Sign Up</Button>

            </div>
           </form>


      </div>
    </div>
  );
};

export default Login;
