import type { FC } from 'react'

import type { PrimaryButtonProps } from '@/types/props/primary-button.props'

import './PrimaryButton.css'
import '@/styles/form-element.css'

const PrimaryButton: FC<PrimaryButtonProps> = ({
  className,
  text,
  type = 'button',
  handleClick,
}) => {
  return (
    <button
      className={`PrimaryButton form-element ${className}`}
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default PrimaryButton
