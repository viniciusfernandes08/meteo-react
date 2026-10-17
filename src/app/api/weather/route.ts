import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("lat", lat);
  console.log("lon", lon);
}