import { FC } from "react"

type Props = {
  className?: string
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ type, label, name, className }) => {
  return (
    <div className="flex flex-col gap-1">
        {label && 
          <label htmlFor={name}>
            {label}
          </label>
        }
        <input 
          type={type} 
          name={name} 
          className={className}
        >
        </input>
    </div>
  )
}

export { Input }