type Props = {
  message: string
}

const CityWeatherError = ({ message }: Props) => {
  return (
    <section
      role="alert"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-2 px-4 text-center"
    >
      <h2 className="text-[#f1f5f9] font-medium font-serif text-base md:text-lg">
        Não foi possível mostrar o clima 🫤
      </h2>
      <p className="text-[#a3a6a8] font-medium text-sm">
        {message}
      </p>
    </section>
  )
}

export { CityWeatherError }
