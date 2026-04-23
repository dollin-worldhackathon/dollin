import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { MiniAppWalletAuthSuccessPayload } from "@worldcoin/minikit-js";
import { verifySiweMessage } from "@worldcoin/minikit-js/siwe";

type RequestBody = {
  payload: MiniAppWalletAuthSuccessPayload;
  nonce: string;
};

export async function POST(req: NextRequest) {
  const { payload, nonce } = (await req.json()) as RequestBody;

  const cookieStore = await cookies();
  const storedNonce = cookieStore.get("siwe")?.value;

  if (!storedNonce || nonce !== storedNonce) {
    return NextResponse.json(
      { isValid: false, error: "Invalid nonce" },
      { status: 400 }
    );
  }

  try {
    const verification = await verifySiweMessage(payload, nonce);

    if (!verification.isValid) {
      return NextResponse.json({ isValid: false }, { status: 400 });
    }

    const address = verification.siweMessageData.address;
    cookieStore.delete("siwe");
    cookieStore.set("session", address, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return NextResponse.json({ isValid: true, address });
  } catch (error) {
    return NextResponse.json(
      {
        isValid: false,
        error: error instanceof Error ? error.message : "Verification failed",
      },
      { status: 400 }
    );
  }
}
