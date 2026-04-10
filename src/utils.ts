import { createHash, randomBytes } from "node:crypto";

export function randomUrlSafeString(length: number): string {
  const size = length > 0 ? length : 32;
  return randomBytes(size).toString("base64url");
}

export function pkceCodeChallenge(codeVerifier: string): string {
  return createHash("sha256").update(codeVerifier).digest("base64url");
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomLowercaseString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const size = length > 0 ? length : 6;
  const bytes = randomBytes(size);
  let result = "";

  for (let i = 0; i < size; i += 1) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
}
