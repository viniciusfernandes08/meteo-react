import { FC } from "react"

type Props = {
  className?: string
  classNameInput?: string
  classNameLabel?: string
  label?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  iconClasses?: string
  onClickIcon?: () => void
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ 
  id,
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
            <span className={iconClasses} onClick={onClickIcon}>
              {icon}
            </span>
          }
          <input 
            id={id}
            type={type} 
            name={name}
            className={classNameInput}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
          >
          </input>
          {icon && iconPosition === "right" &&
            <span className={iconClasses} onClick={onClickIcon}>
              {icon}
            </span>
          }
        </div>
    </div>
  )
}

export { Input }