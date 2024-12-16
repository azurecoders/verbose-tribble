"use client";

import { RegisterUserAction } from "@/action";
import CommonFormElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  BtnValid,
  initialSignUpFormData,
  UserRegistrationFormControls,
} from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const router = useRouter();

  const handleSignUp = async () => {
    const result = await RegisterUserAction(signUpFormData);
    console.log(result);

    if (result?.data) router.push("/sign-in");
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-5">
      <h1 className="text-5xl font-semibold">Registration</h1>
      <form action={handleSignUp}>
        {UserRegistrationFormControls &&
          UserRegistrationFormControls.map((controlItem) => (
            <div key={controlItem.name}>
              <Label>{controlItem.label}</Label>
              <CommonFormElement
                currentItem={controlItem}
                value={signUpFormData[controlItem.name]}
                onChange={(event) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    [controlItem.name]: event.target.value,
                  })
                }
              />
            </div>
          ))}
        <p className="mt-5">
          Already have an Account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-700 hover:underline transition-all duration-300"
          >
            Sign In
          </Link>
        </p>
        <Button
          type="submit"
          disabled={!BtnValid(signUpFormData)}
          className="mt-3"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
