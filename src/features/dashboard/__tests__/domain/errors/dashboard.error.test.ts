import {
  DashboardError,
  DashboardErrorCode,
} from "@/features/dashboard/domain/errors/dashboard.error";

describe("DashboardError", () => {
  it("should preserve the error code and custom message", () => {
    const error = new DashboardError("CITY_NOT_FOUND", "City not found");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(DashboardError);
    expect(error.code).toBe<DashboardErrorCode>("CITY_NOT_FOUND");
    expect(error.message).toBe("City not found");
    expect(error.name).toBe("DashboardError");
  });

  it("should use the error code when no message is provided", () => {
    const error = new DashboardError("TIMEOUT");

    expect(error.message).toBe("TIMEOUT");
  });
});
