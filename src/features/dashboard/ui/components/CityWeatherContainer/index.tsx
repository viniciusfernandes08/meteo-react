'use client'

import { FormSearchCity } from "../FormSearchCity"
import { useSearchCity } from "@/features/dashboard/ui/hooks"
import { MainCardContent } from "../MainCardContent"

const CityWeatherContainer = () => {
  const { onSubmitCityAction, city, isEmpty, isPending } = useSearchCity()

  return (
    <div 
      className="flex flex-col w-full items-center justify-center gap-4"
    >
      <FormSearchCity 
        onSubmitCityAction={onSubmitCityAction}
        isPending={isPending}
      />
      <MainCardContent city={city} isPending={isPending} isEmpty={isEmpty} />
    </div>
  )
}

export { CityWeatherContainer }