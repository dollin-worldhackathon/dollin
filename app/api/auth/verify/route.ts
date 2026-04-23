import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { MiniAppWalletAuthSuccessPayload, verifySiweMessage } from "@worldcoin/minikit-js";

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

    cookieStore.delete("siwe");
    // TODO: 세션/JWT 발급 등 추가 인증 처리

    return NextResponse.json({
      isValid: true,
      address: verification.siweMessageData.address,
    });
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
