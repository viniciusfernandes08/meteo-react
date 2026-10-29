'use client'

import { FormSearchCity } from "../FormSearchCity"
import { useSearchCity } from "@/features/dashboard/ui/hooks"
import { MainCardContent } from "../MainCardContent"
import { CityWeatherError } from "../CityWeatherError"
import { WeatherLoading } from "../WeatherLoading"

const CityWeatherContainer = () => {
  const { onSubmitCityAction, state, isPending } = useSearchCity()

  return (
    <div 
      className="flex flex-col w-full items-center justify-center gap-4"
    >
      <FormSearchCity 
        onSubmitCityAction={onSubmitCityAction}
        isPending={isPending}
      />
      {isPending && <WeatherLoading />}
      {!isPending && state.status === "error" && (
        <CityWeatherError message={state.message} />
      )}
      {!isPending && state.status === "success" && (
        <MainCardContent city={state.data} />
      )}
    </div>
  )
}

export { CityWeatherContainer }
