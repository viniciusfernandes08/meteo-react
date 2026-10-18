import { FC } from "react"
import Image from "next/image"

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
}

const MainCardContent: FC<Props> = ({ city }) => {
  return (
    <section className="flex w-full pt-4 pb-2">
      <div className="flex flex-col w-full items-center justify-center">
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
      <div className="flex w-full justify-center items-center">
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