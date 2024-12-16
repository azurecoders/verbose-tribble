import { FetchAuthUserAction } from "@/action";
import LogOutComponent from "@/components/logout-component";

export default async function Home() {
  const { data } = await FetchAuthUserAction();
  console.log(data);

  return (
    <div className="flex flex-col gap-3 container mx-auto p-5">
      <h1 className="text-4xl font-bold">NextJS Authentication</h1>
      <h2 className="text-xl font-semibold">{data?.username}</h2>
      <p className="text-lg">{data?.email}</p>
      <LogOutComponent />
    </div>
  );
}
