"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full h-12 rounded-lg border border-gray-300 text-gray-600 font-medium"
    >
      로그아웃
    </button>
  );
}
