'use client'

import { Search } from "lucide-react"
import { Input } from "../Input"
import { useSearchCity } from "@/features/dashboard/ui/hooks"

const FormSearchCity = () => {
  const { handleClick, city, isPending } = useSearchCity()

  return (
    <>
      <form
        action={handleClick}
        className="flex px-20 py-4 w-full justify-center"
      >
        <Input
          id="city"
          type="text"
          name="city"
          className="bg-gray-700/30 gap-2 rounded-2xl px-4 py-2"
          classNameInput="outline-none bg-transparent w-full text-[#f1f5f9]"
          placeholder="Digite a cidade"
          label="Pesquise a cidade"
          classNameLabel="text-[#f1f5f9] text-center font-medium font-serif text-lg"
          icon={<Search size={20} strokeWidth={1.8} className="text-sky-300" />}
          iconPosition="right"
          maxLength={58}
          disabled={isPending}
        />
      </form>
      <h1 className="text-[#f1f5f9] text-center font-medium font-serif text-lg">
        {city.lat}, {city.lon}
      </h1>
    </>
  )
}

export { FormSearchCity }