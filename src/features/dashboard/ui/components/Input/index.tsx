import { FC, Ref } from "react"

type Props = {
  className?: string
  classNameInput?: string
  classNameLabel?: string
  label?: string
  ref?: Ref<HTMLInputElement>
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  iconClasses?: string
  onClickIcon?: () => void
  disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ 
  id,
  type,
  label,
  name,
  ref,
  placeholder,
  className,
  classNameInput,
  classNameLabel,
  icon,
  iconPosition,
  iconClasses,
  maxLength,
  disabled,
  onClickIcon
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
            <button 
              className={iconClasses} 
              onClick={onClickIcon} 
              aria-label="icon"
              disabled={disabled}
            >
              {icon}
            </button>
          }
          <input 
            id={id}
            type={type} 
            name={name}
            ref={ref}
            className={classNameInput}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
          >
          </input>
          {icon && iconPosition === "right" &&
            <button 
              className={iconClasses} 
              onClick={onClickIcon} 
              aria-label="icon"
              disabled={disabled}
            >
              {icon}
            </button>
          }
        </div>
    </div>
  )
}

export { Input }