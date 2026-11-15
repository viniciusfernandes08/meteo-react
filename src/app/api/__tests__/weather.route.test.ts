/** @jest-environment node */

import { NextRequest } from "next/server";
import { GET } from "../weather/route";

const fetchMock = jest.fn();

function responseWith(body: unknown, ok: boolean, status: number): Response {
  return {
    ok,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

function requestFor(query: string): NextRequest {
  return new NextRequest(`http://localhost/api/weather?${query}`);
}

describe("GET /api/weather", () => {
  beforeEach(() => {
    process.env.OPENWEATHER_BASE_URL = "https://weather.example.com";
    process.env.OPENWEATHER_API_KEY = "test-api-key";
    global.fetch = fetchMock;
    fetchMock.mockReset();
  });

  it("should return bad request when coordinates are missing", async () => {
    const response = await GET(requestFor("lat=-23.55"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required query parameters: lat and lon",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should return bad request when coordinates are invalid", async () => {
    const response = await GET(requestFor("lat=invalid&lon=-46.63"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid query parameters: lat and lon must be valid numbers",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should fetch and return weather data", async () => {
    const weather = {
      weather: [{ main: "Clear", description: "clear sky" }],
      main: { temp: 24 },
    };
    fetchMock.mockResolvedValue(responseWith(weather, true, 200));

    const response = await GET(requestFor("lat=-23.55&lon=-46.63"));

    expect(fetchMock).toHaveBeenCalledWith(
      "https://weather.example.com/weather?lat=-23.55&lon=-46.63&appid=test-api-key&lang=pt_br&units=metric",
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 600 },
        signal: expect.any(AbortSignal),
      },
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=300, stale-while-revalidate=300",
    );
    await expect(response.json()).resolves.toEqual(weather);
  });

  it("should return bad gateway when the weather provider fails", async () => {
    fetchMock.mockResolvedValue(responseWith(null, false, 503));

    const response = await GET(requestFor("lat=-23.55&lon=-46.63"));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to fetch city weather data",
    });
  });

  it("should return the original error message when fetching fails", async () => {
    fetchMock.mockRejectedValue(new Error("Provider unavailable"));

    const response = await GET(requestFor("lat=-23.55&lon=-46.63"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Provider unavailable",
    });
  });

  it("should return a generic message for non-error failures", async () => {
    fetchMock.mockRejectedValue("unexpected failure");

    const response = await GET(requestFor("lat=-23.55&lon=-46.63"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "An unexpected error occurred",
    });
  });
});
