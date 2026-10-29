import { useActionState, startTransition } from "react"
import { getCityWeatherUseCase } from "@/features/dashboard/application/usecases/get-city-weather"
import { dashboardRepositoryImpl } from "@/features/dashboard/infra/repositories/dashboard.repository.impl"
import { EMPTY_STATE } from "@/features/dashboard/ui/constants/empty-state"
import { citySchema } from "@/features/dashboard/ui/schemas/city.schema"
import { SearchCityState } from "@/features/dashboard/ui/types/search-city-state.types"
import { ERROR_MESSAGES } from "@/features/dashboard/ui/constants/error-messages"

const repository = dashboardRepositoryImpl

async function cityAction(
  _prevState: SearchCityState, 
  formData: FormData
): Promise<SearchCityState> {
  const result = citySchema(formData.get("city"))

  if (!result.success) {
    return {
      status: "error",
      message: result.error
    }
  }

  const weatherResult = await getCityWeatherUseCase(repository, result.data)

  if (weatherResult.status === "error") {
    return {
      status: "error",
      message: ERROR_MESSAGES[weatherResult.code]
    }
  }

  return {
    status: "success",
    data: weatherResult.data
  }
}

export const useSearchCity = () => {
  const [state, dispatchCityAction, isPending] = useActionState(cityAction, EMPTY_STATE)

  const onSubmitCityAction = (formData: FormData) => {
    startTransition(() => {
      dispatchCityAction(formData);
    })
  }

  return {
    state,
    onSubmitCityAction,
    isPending
  }
}
