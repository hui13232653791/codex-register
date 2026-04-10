import {existsSync} from "node:fs";
import {chromium, type Browser, type Page} from "playwright-core";

const SENTINEL_FRAME_URL = "https://sentinel.openai.com/backend-api/sentinel/frame.html?sv=20260219f9f6";
const SENTINEL_COOKIE_DOMAIN = "sentinel.openai.com";
const SENTINEL_COOKIE_URL = "https://sentinel.openai.com/";
const SENTINEL_SCRIPT_READY_TIMEOUT_MS = 20000;

let browserPromise: Promise<Browser> | null = null;
let pagePromise: Promise<Page> | null = null;

declare global {
    interface Window {
        SentinelSDK?: {
            token(flow: string): Promise<string>;
        };
    }
}

function resolveBrowserExecutablePath(): string {
    const candidates = [
        process.env.SENTINEL_BROWSER_PATH,
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ].filter(Boolean) as string[];

    const matched = candidates.find((candidate) => existsSync(candidate));
    if (!matched) {
        throw new Error("未找到可用浏览器，请设置 SENTINEL_BROWSER_PATH");
    }
    return matched;
}

async function getBrowser(): Promise<Browser> {
    if (!browserPromise) {
        browserPromise = chromium.launch({
            headless: true,
            executablePath: resolveBrowserExecutablePath(),
        });
    }
    return browserPromise;
}

async function getSentinelPage(): Promise<Page> {
    if (!pagePromise) {
        pagePromise = (async () => {
            const browser = await getBrowser();
            const page = await browser.newPage();
            await page.goto(SENTINEL_FRAME_URL, {
                waitUntil: "domcontentloaded",
                timeout: SENTINEL_SCRIPT_READY_TIMEOUT_MS,
            });
            await page.waitForFunction(() => {
                return typeof window.SentinelSDK?.token === "function";
            }, {timeout: SENTINEL_SCRIPT_READY_TIMEOUT_MS});
            return page;
        })().catch((error) => {
            pagePromise = null;
            throw error;
        });
    }
    return pagePromise;
}

async function ensureDeviceCookie(page: Page, deviceID: string): Promise<void> {
    const context = page.context();
    await context.addCookies([
        {
            name: "oai-did",
            value: deviceID,
            domain: SENTINEL_COOKIE_DOMAIN,
            path: "/",
            secure: true,
            httpOnly: false,
            sameSite: "None",
        },
    ]);
}

export async function fetchSentinelTokenFromBrowser(
    flow: string,
    deviceID: string,
): Promise<string> {
    const page = await getSentinelPage();
    await ensureDeviceCookie(page, deviceID);
    await page.goto(SENTINEL_FRAME_URL, {
        waitUntil: "domcontentloaded",
        timeout: SENTINEL_SCRIPT_READY_TIMEOUT_MS,
    });
    await page.waitForFunction(() => {
        return typeof window.SentinelSDK?.token === "function";
    }, {timeout: SENTINEL_SCRIPT_READY_TIMEOUT_MS});

    const result = await page.evaluate(async ({runtimeFlow}) => {
        if (typeof window.SentinelSDK?.token !== "function") {
            throw new Error("SentinelSDK.token 不可用");
        }
        return await window.SentinelSDK.token(runtimeFlow);
    }, {runtimeFlow: flow});

    if (typeof result !== "string" || !result.trim()) {
        throw new Error(`浏览器 SentinelSDK 返回异常: ${JSON.stringify(result)}`);
    }

    console.log(`browserSentinelTokenSuccess: flow=${flow}`);
    return result;
}
