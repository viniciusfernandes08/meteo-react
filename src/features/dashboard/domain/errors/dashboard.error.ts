export type DashboardErrorCode =
  | "CITY_NOT_FOUND"
  | "UPSTREAM_ERROR"
  | "TIMEOUT"
  | "UNKNOWN"

export class DashboardError extends Error {
  constructor(
    public readonly code: DashboardErrorCode,
    message?: string
  ) {
    super(message ?? code)
    this.name = "DashboardError"
  }
}
