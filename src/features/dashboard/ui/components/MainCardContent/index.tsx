import { FC } from "react"
import Image from "next/image"
import { WeatherLoading } from "../WeatherLoading"

type Props = {
  city: {
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }
    main: {
      temp: number
      feelsLike: number
    }
    cityName: string
  }
  isPending: boolean
}

const MainCardContent: FC<Props> = ({ city, isPending }) => {
  if (isPending) return <WeatherLoading />
  
  return (
    <section className="flex justify-center w-full gap-8 lg:pl-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[#f1f5f9] text-center font-medium font-serif text-lg">
          {city.cityName.toLocaleUpperCase()}
        </h2>
        <h6 className="text-[#a3a6a8] text-center font-medium text-sm">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
          })}
        </h6>
        <h1 className="text-[#f1f5f9] text-center font-medium text-6xl mt-4 mb-4">
          {city.main.temp?.toFixed(0)}°C
        </h1>
        <h5 className="text-[#f1f5f9] text-center font-medium font-serif text-lg">
          {city.weather.description.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </h5>
        <h5 className="text-[#a3a6a8] text-center font-medium">
          Sensação térmica {city.main.feelsLike?.toFixed(0)}°C
        </h5>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`} 
          alt={city.weather.description}
          width={140}
          height={140}
          quality={100}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export { MainCardContent }