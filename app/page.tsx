import Image from "next/image";
import { LoginButton } from "./login-button";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col gap-30 justify-center items-center">
      <div className="w-full h-fit flex flex-col gap-3 font-medium items-center justify-center">
        <span>Welcome</span>
        <span>Hope you can heal with Dollin</span>
      </div>
      <Image src="/bigdoll.webp" width={320} height={400} alt="" />
      <div className="w-full h-fit flex flex-col gap-5 items-center justify-center">
        <LoginButton />
      </div>
    </div>
  );
}
