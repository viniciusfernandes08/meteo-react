import { useActionState, startTransition } from "react"
import { getCityWeatherUseCase } from "@/features/dashboard/application/usecases/get-city-weather"
import { dashboardRepositoryImpl } from "@/features/dashboard/infra/repositories/dashboard.repository.impl"
import { EMPTY_STATE } from "@/features/dashboard/ui/constants/empty-state"
import { citySchema } from "@/features/dashboard/ui/schemas/city.schema"

const repository = dashboardRepositoryImpl

async function cityAction(
  _prevState: typeof EMPTY_STATE, 
  formData: FormData
) {
  const result = citySchema(formData.get("city"))

  if (!result.success) {
    throw new Error(result.error)
  }

  return getCityWeatherUseCase(repository, result.data)
}

export const useSearchCity = () => {
  const [city, dispatchCityAction, isPending] = useActionState(cityAction, EMPTY_STATE)

  const isEmpty = city === EMPTY_STATE || city === undefined

  const onSubmitCityAction = (formData: FormData) => {
    startTransition(() => {
      dispatchCityAction(formData);
    })
  }

  return {
    city,
    isEmpty,
    onSubmitCityAction,
    isPending
  }
}