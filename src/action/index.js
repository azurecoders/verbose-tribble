"use server";

import connectToDB from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Register User

export const RegisterUserAction = async (formData) => {
  await connectToDB();
  try {
    const { username, email, password } = formData;

    const checkUser = await User.findOne({ email });

    if (checkUser)
      return {
        success: false,
        message: "Account already exists",
      };

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newlyCreatedUser.save();

    if (!savedUser)
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedUser)),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
};

export const LoginUserAction = async (formData) => {
  await connectToDB();
  try {
    const { email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return {
        success: false,
        message: "User doesn't exist. Please signup",
      };

    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword)
      return {
        success: false,
        message: "Invalid Password",
      };

    const createTokenData = {
      id: checkUser._id,
      userName: checkUser.username,
      email: checkUser.email,
    };

    const token = jwt.sign(createTokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const getCookies = await cookies();
    getCookies.set("token", token);
    return {
      success: true,
      message: "Login Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
};

export const FetchAuthUserAction = async () => {
  await connectToDB();
  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value || "";

    if (token === "")
      return {
        success: false,
        message: "Invalid Token",
      };

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const getUserInfo = await User.findById(decodedToken.id);
    if (!getUserInfo)
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(getUserInfo)),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
};

export const LogOutUserAction = async () => {
  try {
    const getCookies = await cookies();
    getCookies.set("token", "");
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
};
