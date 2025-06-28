import { jwtVerify } from "jose";

export async function verifyJwtToken(token: string) {
  const secret = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? ""
  );

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
