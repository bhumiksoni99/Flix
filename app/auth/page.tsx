"use client";

import React, { useCallback, useRef, useState } from "react";
import Input from "../components/Input";
import { AuthVariant } from "./typings";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
  const nameRef = useRef<React.Reference | null>(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [variant, setVariant] = useState(AuthVariant.LOGIN);

  const toggleVariant = useCallback(() => {
    setVariant((current) => {
      if (current === AuthVariant.LOGIN) {
        return AuthVariant.REGISTER;
      } else {
        return AuthVariant.LOGIN;
      }
    });
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        username: nameRef.current?.value,
      });
      toast.success("Account created! Login to enjoy watching!", {
        position: "bottom-center",
      });
      login();
    } catch (e) {
      toast.error(e.response.data.error, {
        position: "bottom-center",
        style: {
          color: "#f54242",
          background: "#18181B",
        },
      });
    }
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        callbackUrl: "/profiles",
      });
    } catch (e) {
      console.log("as", e);
    }
  }, []);

  const gitHubLogin = useCallback(async () => {
    try {
      await signIn("github", { callbackUrl: "/profiles" });
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center lg:bg-[url('../public/images/hero.jpg')] bg-black bg-cover">
      <Toaster />
      <div className="bg-black w-screen h-screen lg:bg-opacity-50 absolute" />
      <div className="bg-black bg-opacity-70 z-10 px-12 py-8 rounded-lg flex flex-col min-w-96 items-center">
        <p className="text-white text-3xl font-semibold">
          {variant === AuthVariant.LOGIN ? "Sign In" : "Sign Up"}
        </p>
        <div className="flex flex-col flex-1 w-full gap-6 mt-8">
          {variant === AuthVariant.REGISTER && (
            <Input type="name" ref={nameRef} label="Enter username" />
          )}
          <Input
            type="email"
            ref={emailRef}
            label="Enter email or phone number"
          />
          <Input type="password" ref={passwordRef} label="Enter Password" />
        </div>
        <button
          className="h-10 bg-red-700 hover:bg-red-500 mt-8 flex w-full flex-1 justify-center py-2 rounded-md"
          onClick={() => {
            if (variant === AuthVariant.REGISTER) {
              register();
            } else {
              login();
            }
          }}
        >
          <p className="text-white text-md">
            {variant === AuthVariant.LOGIN ? "Login" : "Sign up"}
          </p>
        </button>
        <div className="flex flex-row justify-self-center	py-6 gap-2">
          <div className="w-10 h-10 bg-white justify-center flex rounded-full items-center">
            <FaGoogle />
          </div>
          <div
            onClick={gitHubLogin}
            className="w-10 h-10 bg-white justify-center flex rounded-full items-center cursor-pointer"
          >
            <FaGithub />
          </div>
        </div>
        <p className="text-gray-400 text-xs text-center flex flex-1 items-center">
          {AuthVariant.LOGIN === variant
            ? "First time using Netflix?"
            : "Already have an account?"}
          <span onClick={toggleVariant} className="text-white font-bold">
            {"  "}
            {"  "}
            {variant === AuthVariant.LOGIN ? "Create an account" : "Login now"}
          </span>
        </p>
      </div>
    </div>
  );
}
