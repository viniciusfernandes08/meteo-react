import { NextResponse } from "next/server"

export async function GET(
  req: Request, 
  { params }: { params: { city: string } }
) {
  const { city } = await params

  try {
    const response = await fetch(
      `${process.env.OPENWEATHER_GEOCODING_BASE_URL}/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`,
      {
        method: "GET",
        signal: AbortSignal.timeout(8000)
      }
    )

    const data = await response.json()

    return NextResponse.json(data?.[0] || {}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }, 
      { status: 500 }
    )
  }
}