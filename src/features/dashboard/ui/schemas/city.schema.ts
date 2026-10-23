import { CityValidationResult } from "@/features/dashboard/ui/types/city-validation.types"

const CITY_REGEX = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u

export function citySchema(input: unknown): CityValidationResult {
  if (typeof input !== "string") {
    return {
      success: false,
      error: "A cidade deve ser um texto",
    }
  }

  const city = input.trim().replace(/\s+/g, " ")

  if (!city) {
    return {
      success: false,
      error: "A cidade é obrigatória",
    }
  }

  if (city.length > 100) {
    return {
      success: false,
      error: "A cidade deve ter no máximo 100 caracteres",
    }
  }

  if (!CITY_REGEX.test(city)) {
    return {
      success: false,
      error: "A cidade contém caracteres inválidos",
    }
  }

  return {
    success: true,
    data: city,
  }
}