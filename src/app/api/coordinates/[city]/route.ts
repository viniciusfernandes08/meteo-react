import { NextResponse } from "next/server"

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ city: string }> }
) {
  const { city } = await params
  const normalizedCity = city?.trim().toLowerCase()

  if (!normalizedCity) {
    return NextResponse.json(
      {
        error: "Missing required route parameter: city"
      },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `${process.env.OPENWEATHER_GEOCODING_BASE_URL}/direct?q=${encodeURIComponent(normalizedCity)}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(8000)
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch city coordinates"
        },
        { status: 502 }
      )
    }

    const data = await response.json()

    if (!data?.[0]) {
      return NextResponse.json(
        {
          error: "City not found"
        },
        { status: 404 }
      )
    }

    return NextResponse.json(data[0], {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800"
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }, 
      { status: 500 }
    )
  }
}
