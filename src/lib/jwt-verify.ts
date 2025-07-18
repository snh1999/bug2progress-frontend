import { jwtVerify } from "jose";
import { toast } from "sonner";

export async function verifyJwtToken(token: string) {
  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? ""
  );

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error: any) {
    console.error(error);
    console.error(
      error?.response?.data?.message ??
        error?.message ??
        "Failed to verify token"
    );
    return null;
  }
}
