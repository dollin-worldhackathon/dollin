import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col gap-30 justify-center items-center">
      <div className="w-full h-fit flex flex-col gap-3 font-medium items-center justify-center">
        <span>Welcome</span>
        <span>Hope you can heal with Dollin</span>
      </div>
      <Image src="/bigdoll.webp" width={320} height={400} alt="" />
      <div className="w-full h-fit flex flex-col gap-5 items-center justify-center">
        <button className="font-bold w-11/12 bg-primary h-12 rounded-lg shadow-md">Login with WORLD</button>
      </div>
    </div>
  );
}
