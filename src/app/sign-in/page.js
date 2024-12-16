"use client";

import { LoginUserAction } from "@/action";
import CommonFormElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BtnValid, initialLoginFormData, UserLoginFormControls } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState(initialLoginFormData);
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await LoginUserAction(signInFormData);
    console.log(result);
    if (result?.success) {
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-5">
      <h1 className="text-5xl font-semibold">Login</h1>
      <form action={handleSignIn}>
        {UserLoginFormControls &&
          UserLoginFormControls.map((controlItem) => (
            <div key={controlItem.name}>
              <Label>{controlItem.label}</Label>
              <CommonFormElement
                currentItem={controlItem}
                value={signInFormData[controlItem.name]}
                onChange={(event) =>
                  setSignInFormData({
                    ...signInFormData,
                    [controlItem.name]: event.target.value,
                  })
                }
              />
            </div>
          ))}
        <p className="mt-5">
          Dont have an Account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-700 hover:underline transition-all duration-300"
          >
            Sign Up
          </Link>
        </p>
        <Button
          type="submit"
          disabled={!BtnValid(signInFormData)}
          className="mt-3"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
