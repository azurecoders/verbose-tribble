"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FetchAuthUserAction } from "@/action";
import LogOutComponent from "@/components/logout-component";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await FetchAuthUserAction();

        if (!data) {
          router.push("/sign-in");
          return;
        }

        setUserData(data);
      } catch (error) {
        router.push("/sign-in");
      }
    }

    fetchUserData();
  }, [router]);

  // If no user data, return null or a loading state
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3 container mx-auto p-5">
      <h1 className="text-4xl font-bold">NextJS Authentication</h1>
      <h2 className="text-xl font-semibold">{userData.username}</h2>
      <p className="text-lg">{userData.email}</p>
      <LogOutComponent />
    </div>
  );
}
