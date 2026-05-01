import { NextResponse } from "next/server";

const GH_REPO = "mibrahimzarar/Quietly";
const GH_TOKEN = process.env.GH_RELEASES_TOKEN;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("id");
  const filename = searchParams.get("name") || "Quietly-Setup.exe";

  if (!assetId) {
    return NextResponse.json({ error: "Asset ID is required" }, { status: 400 });
  }

  if (!GH_TOKEN) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    // GitHub Release Asset API endpoint
    // Documentation: https://docs.github.com/en/rest/releases/assets#get-a-release-asset
    const githubUrl = `https://api.github.com/repos/${GH_REPO}/releases/assets/${assetId}`;

    const response = await fetch(githubUrl, {
      headers: {
        Authorization: `Bearer ${GH_TOKEN}`,
        Accept: "application/octet-stream",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch asset from GitHub" },
        { status: response.status }
      );
    }

    // Get the binary data
    const blob = await response.blob();

    // Return the binary data with correct headers to trigger download
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Length": response.headers.get("Content-Length") || blob.size.toString(),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
