import { DashboardErrorCode } from "@/features/dashboard/domain/errors/dashboard.error"

export const ERROR_MESSAGES: Record<DashboardErrorCode, string> = {
  CITY_NOT_FOUND: "Cidade não encontrada. Confira o nome e tente novamente.",
  TIMEOUT: "A busca demorou demais. Tente novamente em instantes.",
  UPSTREAM_ERROR: "Não foi possível buscar o clima agora. Tente novamente em instantes.",
  UNKNOWN: "Ocorreu um erro inesperado. Tente novamente."
}