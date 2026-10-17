import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { 
        error: "Missing required query parameters: lat and lon" 
      }, 
      { status: 400 }
    );
  }

  if (isNaN(Number(lat)) || isNaN(Number(lon))) {
    return NextResponse.json(
      {
        error: "Invalid query parameters: lat and lon must be valid numbers"
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ lat, lon }, { status: 200 });
}