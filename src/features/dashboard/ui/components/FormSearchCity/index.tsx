'use client'

import { Search } from "lucide-react"
import { Input } from "../Input"
import { FC } from "react"

type Props = {
  onSubmitCityAction: (formData: FormData) => void
  isPending: boolean
}

const FormSearchCity: FC<Props> = ({ 
  onSubmitCityAction, 
  isPending 
}) => {
  return (
    <form
      action={onSubmitCityAction}
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
  )
}

export { FormSearchCity }