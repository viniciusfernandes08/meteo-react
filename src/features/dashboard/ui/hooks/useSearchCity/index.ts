import { useActionState, startTransition } from "react"
import { getCityWeatherUseCase } from "@/features/dashboard/application/usecases/get-city-weather"
import { dashboardRepositoryImpl } from "@/features/dashboard/infra/repositories/dashboard.repository.impl"

const repository = dashboardRepositoryImpl

async function cityActionOrchestrator(_: unknown, formData: FormData) {
  const city = formData.get('city') as string

  if (!city || typeof city !== "string" || city.trim() === "") {
    throw new Error("A cidade é obrigatória")
  }

  const { lat, lon } = await getCityWeatherUseCase(repository, city)

  return {
    lat,
    lon
  }
}

export const useSearchCity = () => {
  const [city, dispatchCityAction, isPending] = useActionState(cityActionOrchestrator, {
    lat: 0,
    lon: 0
  })

  const handleClick = (formData: FormData) => {
    startTransition(() => {
      dispatchCityAction(formData);
    })
  }

  return {
    city,
    handleClick,
    isPending
  }
}