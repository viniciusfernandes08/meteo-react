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

  try {
    const response = await fetch(
      `${process.env.OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&lang=pt_br&units=metric`,
      {
        method: "GET",
        signal: AbortSignal.timeout(5000)
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }, 
      { status: 500 }
    );
  }
}