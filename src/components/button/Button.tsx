import type { FC } from 'react'

import styles from '@/components/button/Button.module.scss'
import type { ButtonProps } from '@/types/props/button.props'

const Button: FC<ButtonProps> = ({
  className,
  text,
  type = 'button',
  disabled,
  handleClick,
}) => {
  return (
    <button
      className={`${styles.Button} ${className ?? ''}`}
      type={type}
      disabled={disabled}
      {...(handleClick && { onClick: handleClick })}
    >
      {text}
    </button>
  )
}

export default Button
