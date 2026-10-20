import Image from "next/image"

const WeatherLoading = () => {
  return (
    <Image 
      src={"/assets/weather-icons/sunny_icon.ico"} 
      alt="Loading"
      width={96}
      height={96}
      className="animate-pulse"
    />
  )
}

export { WeatherLoading }