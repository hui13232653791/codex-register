export const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0";

export function generateRandomUserAgent(): string {
  const chromeMajor = randomInt(132, 146);
  const chromeBuild = randomInt(0, 9999);
  const chromePatch = randomInt(0, 999);
  const browserStyle = pick(["chrome", "edge"]);

  if (browserStyle === "edge") {
    const edgeMajor = randomInt(Math.max(132, chromeMajor - 1), chromeMajor);
    return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeMajor}.0.${chromeBuild}.${chromePatch} Safari/537.36 Edg/${edgeMajor}.0.${randomInt(0, 9999)}.${randomInt(0, 999)}`;
  }

  return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeMajor}.0.${chromeBuild}.${chromePatch} Safari/537.36`;
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AUTH_BASE_URL = "https://auth.openai.com";

export const AUTH_AUTHORIZE_CONTINUE_URL =
  "https://auth.openai.com/api/accounts/authorize/continue";

export const AUTH_PASSWORD_VERIFY_URL =
  "https://auth.openai.com/api/accounts/password/verify";

export const AUTH_EMAIL_OTP_VALIDATE_URL =
  "https://auth.openai.com/api/accounts/email-otp/validate";

export const AUTH_WORKSPACE_SELECT_URL =
  "https://auth.openai.com/api/accounts/workspace/select";

export const AUTH_REGISTER_URL =
  "https://auth.openai.com/api/accounts/user/register";

export const AUTH_EMAIL_OTP_SEND_URL =
  "https://auth.openai.com/api/accounts/email-otp/send";

export const AUTH_OAUTH_TOKEN_URLS = [
  "https://auth.openai.com/api/oauth/oauth2/token",
  "https://auth.openai.com/oauth/token",
] as const;

export const DEFAULT_REDIRECT_URI = "http://localhost:1455/auth/callback";

export const DEFAULT_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";

export const CHATGPT_BASE_URL = "https://chatgpt.com";
