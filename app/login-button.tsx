"use client";

import { MiniKit } from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/nonce");
      const { nonce } = await res.json();

      const result = await MiniKit.walletAuth({
        nonce,
        statement: "Sign in to Dollin",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60),
      });

      if (result.executedWith === "fallback") return;

      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: result.data, nonce }),
      });

      const { isValid } = await verifyRes.json();
      if (isValid) {
        router.push("/chats");
      } else {
        setError("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <button
        onClick={handleLogin}
        disabled={loading}
        className="font-bold w-11/12 bg-primary h-12 rounded-lg shadow-md disabled:opacity-60"
      >
        {loading ? "로그인 중..." : "Login with WORLD"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
