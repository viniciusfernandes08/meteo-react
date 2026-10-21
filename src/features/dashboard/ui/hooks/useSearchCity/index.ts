import { useActionState, startTransition } from "react"
import { getCityWeatherUseCase } from "@/features/dashboard/application/usecases/get-city-weather"
import { dashboardRepositoryImpl } from "@/features/dashboard/infra/repositories/dashboard.repository.impl"
import { EMPTY_STATE } from "@/features/dashboard/ui/constants/empty-state"

const repository = dashboardRepositoryImpl

async function cityAction(_: unknown, formData: FormData) {
  const city = formData.get('city') as string

  if (!city || typeof city !== "string" || city.trim() === "") {
    throw new Error("A cidade é obrigatória")
  }

  const data = await getCityWeatherUseCase(repository, city)

  return data
}

export const useSearchCity = () => {
  const [city, dispatchCityAction, isPending] = useActionState(cityAction, EMPTY_STATE)

  const onSubmitCityAction = (formData: FormData) => {
    startTransition(() => {
      dispatchCityAction(formData);
    })
  }

  return {
    city,
    onSubmitCityAction,
    isPending
  }
}