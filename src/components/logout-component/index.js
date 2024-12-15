"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogOutUserAction } from "@/action";

const LogOutComponent = () => {
  const handleLogOut = async () => {
    await LogOutUserAction();
  };
  return (
    <div>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
};

export default LogOutComponent;
