import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { license_key } = await request.json();

    if (!license_key) {
      return NextResponse.json(
        { valid: false, error: "License key is required" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

    if (!API_KEY) {
      console.error("LEMON_SQUEEZY_API_KEY is missing from environment variables");
      return NextResponse.json(
        { valid: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Lemon Squeezy API
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        // The endpoint uses the API key for authorization if required depending on store permissions,
        // but typically validate only needs the key in the body. We'll pass both just in case.
        Authorization: `Bearer ${API_KEY}`,
      },
      body: new URLSearchParams({
        license_key,
      }),
    });

    const data = await response.json();

    // The API returns 200 OK with `valid: true` or `valid: false` inside the body
    if (response.ok && data.valid) {
      return NextResponse.json({
        valid: true,
        license_key: data.license_key,
      });
    }

    return NextResponse.json(
      {
        valid: false,
        error: data.error || "Invalid license key",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("License validation error:", error);
    return NextResponse.json(
      { valid: false, error: "An error occurred during validation" },
      { status: 500 }
    );
  }
}
