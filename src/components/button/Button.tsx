import type { FC } from 'react'

import type { ButtonProps } from '@/types/props/button.props'

import '@/styles/form-element.css'
import '@/components/button/Button.css'

const Button: FC<ButtonProps> = ({
  className,
  text,
  type = 'button',
  handleClick,
}) => {
  return (
    <button
      className={`Button form-element ${className}`}
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default Button
