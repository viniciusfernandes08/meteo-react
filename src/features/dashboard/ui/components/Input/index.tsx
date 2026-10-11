import { FC } from "react"

type Props = {
  className?: string
  classNameInput?: string
  classNameLabel?: string
  label?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  iconClasses?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ 
  type,
  label,
  name,
  placeholder,
  className,
  classNameInput,
  classNameLabel,
  icon,
  iconPosition,
  iconClasses,
  maxLength,
}) => {
  return (
    <div className="flex flex-col gap-1">
        {label && 
          <label htmlFor={name} className={classNameLabel}>
            {label}
          </label>
        }
        <div className={`flex ${className}`}>
          {icon && iconPosition === "left" &&
            <span className={iconClasses}>
              {icon}
            </span>
          }
          <input 
            type={type} 
            name={name} 
            className={classNameInput}
            placeholder={placeholder}
            maxLength={maxLength}
          >
          </input>
          {icon && iconPosition === "right" &&
            <span className={iconClasses}>
              {icon}
            </span>
          }
        </div>
    </div>
  )
}

export { Input }