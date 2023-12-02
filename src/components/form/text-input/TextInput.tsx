import { ChangeEvent, type FC } from 'react'

import type { TextInputProps } from '@/types/props/text-input.props'

import '@/components/form/text-input/TextInput.css'
import '@/styles/form-element.css'

const TextInput: FC<TextInputProps> = ({
  className,
  label,
  type = 'text',
  value,
  onChange,
}) => {
  const handleValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value)
  }

  return (
    <div className={`TextInput ${className}`}>
      {label && (
        <label className='input-label' htmlFor='input'>
          {label}
        </label>
      )}
      <input
        id='input'
        className='input form-element'
        type={type}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  )
}

export default TextInput
