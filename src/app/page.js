"use client";

import { FetchAuthUserAction, LogOutUserAction } from "@/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await FetchAuthUserAction();
      if (!data) router.push("/sign-in");

      setUserData(data);
    } catch (error) {
      console.error(error);
      router.push("/sign-in");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [router]);

  const LogOutComponent = () => {
    const handleLogOut = async () => {
      try {
        await LogOutUserAction();
        router.push("/sign-in");
      } catch (error) {
        console.error(error);
        router.push("/sign-in");
      }
    };

    return <Button onClick={handleLogOut}>Log Out</Button>;
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (!userData) router.push("/sign-in");

  return (
    <div className="flex flex-col gap-3 container mx-auto p-5">
      <h1 className="text-4xl font-bold">NextJS Authentication</h1>
      <h2 className="text-xl font-semibold">{userData.username}</h2>
      <p className="text-lg">{userData.email}</p>
      <LogOutComponent />
    </div>
  );
}
