export type CityValidationResult =
  | {
      success: true
      data: string
    }
  | {
      success: false
      error: string
    }