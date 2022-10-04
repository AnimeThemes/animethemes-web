import { AUTH_URL } from "utils/config";

export async function logIn(email: string, password: string) {
    return await sendAuthRequest("/login", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });
}

export async function logOut() {
    return await sendAuthRequest("/logout");
}

export async function confirmPassword(password: string) {
    return await sendAuthRequest("/user/confirm-password", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `password=${encodeURIComponent(password)}`,
    });
}

export async function twoFactorChallenge(code: string) {
    return await sendAuthRequest("/two-factor-challenge", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${encodeURIComponent(code)}`,
    });
}

export async function twoFactorEnable() {
    return await sendAuthRequest("/user/two-factor-authentication");
}

export async function twoFactorQrCode() {
    return await sendAuthRequest("/user/two-factor-qr-code", {
        method: "GET",
    });
}

export async function twoFactorSecretKey() {
    return await sendAuthRequest("/user/two-factor-secret-key", {
        method: "GET",
    });
}

export async function twoFactorConfirm(code: string) {
    return await sendAuthRequest("/user/confirmed-two-factor-authentication", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${encodeURIComponent(code)}`,
    });
}

async function sendAuthRequest(path: string, options: RequestInit = {}) {
    const csrfToken = await getCsrfToken();

    const response = await fetch(`${AUTH_URL}${path}`, {
        method: "POST",
        credentials: "include",
        ...options,
        headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": csrfToken,
            ...options.headers,
        },
    });

    // No content
    if (response.status === 204) {
        return {};
    }

    // Locked: requires password confirmation
    if (response.status === 423) {
        return {
            passwordRequired: true,
        };
    }

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message ?? response.statusText);
    }

    return json;
}

async function getCsrfToken(): Promise<string> {
    // First check if there is already a csrf token
    let csrfToken = extractCsrfTokenFromCookie();

    if (!csrfToken) {
        await fetch(`${AUTH_URL}/sanctum/csrf-cookie`, {
            credentials: "include",
        });

        csrfToken = extractCsrfTokenFromCookie();

        if (!csrfToken) {
            throw new Error("Failed to fetch csrf token!");
        }
    }

    return csrfToken;
}

function extractCsrfTokenFromCookie(): string | null {
    const cookies = document.cookie.split("; ");

    const csrfToken = cookies
        .map((keyValue) => keyValue.split("="))
        .find(([key]) => key === "XSRF-TOKEN")
        ?.at(1);

    return csrfToken ? decodeURIComponent(csrfToken) : null;
}
