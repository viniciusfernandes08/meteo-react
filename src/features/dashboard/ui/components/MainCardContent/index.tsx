import { FC } from "react"

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
    <section className="flex flex-col w-full">
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
    </section>
  )
}

export { MainCardContent }