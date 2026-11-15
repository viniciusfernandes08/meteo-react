/** @jest-environment node */

import { GET } from "../coordinates/[city]/route";

const fetchMock = jest.fn();

function responseWith(body: unknown, ok: boolean, status: number): Response {
  return {
    ok,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe("GET /api/coordinates/[city]", () => {
  beforeEach(() => {
    process.env.OPENWEATHER_GEOCODING_BASE_URL = "https://geo.example.com";
    process.env.OPENWEATHER_API_KEY = "test-api-key";
    global.fetch = fetchMock;
    fetchMock.mockReset();
  });

  it("should return bad request when city is missing", async () => {
    const response = await GET({} as Request, {
      params: Promise.resolve({ city: "   " }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required route parameter: city",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should return bad request when city is undefined", async () => {
    const response = await GET({} as Request, {
      params: Promise.resolve({ city: undefined as unknown as string }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Missing required route parameter: city",
    });
  });

  it("should fetch and return city coordinates", async () => {
    const coordinates = {
      name: "São Paulo",
      lat: -23.55,
      lon: -46.63,
    };
    fetchMock.mockResolvedValue(responseWith([coordinates], true, 200));

    const response = await GET({} as Request, {
      params: Promise.resolve({ city: " São Paulo " }),
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://geo.example.com/direct?q=s%C3%A3o%20paulo&limit=1&appid=test-api-key",
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 86400 },
        signal: expect.any(AbortSignal),
      },
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=86400, stale-while-revalidate=604800",
    );
    await expect(response.json()).resolves.toEqual(coordinates);
  });

  it("should return bad gateway when the coordinates provider fails", async () => {
    fetchMock.mockResolvedValue(responseWith(null, false, 503));

    const response = await GET({} as Request, {
      params: Promise.resolve({ city: "São Paulo" }),
    });

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to fetch city coordinates",
    });
  });

  it("should return not found when the provider returns no city", async () => {
    fetchMock.mockResolvedValue(responseWith([], true, 200));

    const response = await GET({} as Request, {
      params: Promise.resolve({ city: "Unknown" }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: "City not found",
    });
  });

  it("should return the original error message when fetching fails", async () => {
    fetchMock.mockRejectedValue(new Error("Provider unavailable"));

    const response = await GET({} as Request, {
      params: Promise.resolve({ city: "São Paulo" }),
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Provider unavailable",
    });
  });

  it("should return a generic message for non-error failures", async () => {
    fetchMock.mockRejectedValue("unexpected failure");

    const response = await GET({} as Request, {
      params: Promise.resolve({ city: "São Paulo" }),
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "An unexpected error occurred",
    });
  });
});
