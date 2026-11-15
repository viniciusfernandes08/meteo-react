import { citySchema } from "@/features/dashboard/ui/schemas/city.schema";

describe("citySchema", () => {
  it("should reject non-string values", () => {
    expect(citySchema(null)).toEqual({
      success: false,
      error: "A cidade deve ser um texto",
    });
    expect(citySchema(123)).toEqual({
      success: false,
      error: "A cidade deve ser um texto",
    });
  });

  it("should reject an empty city", () => {
    expect(citySchema("   ")).toEqual({
      success: false,
      error: "A cidade é obrigatória",
    });
  });

  it("should reject cities longer than 100 characters", () => {
    expect(citySchema("A".repeat(101))).toEqual({
      success: false,
      error: "A cidade deve ter no máximo 100 caracteres",
    });
  });

  it("should reject cities with invalid characters", () => {
    expect(citySchema("São Paulo 123")).toEqual({
      success: false,
      error: "A cidade contém caracteres inválidos",
    });
  });

  it("should normalize whitespace and accept valid city names", () => {
    expect(citySchema("  São   Paulo  ")).toEqual({
      success: true,
      data: "São Paulo",
    });
  });

  it("should accept accented names and supported punctuation", () => {
    expect(citySchema("  O'Hare - D’Ávila. ")).toEqual({
      success: true,
      data: "O'Hare - D’Ávila.",
    });
  });

  it("should accept a city with exactly 100 characters", () => {
    const city = "A".repeat(100);

    expect(citySchema(city)).toEqual({
      success: true,
      data: city,
    });
  });
});
