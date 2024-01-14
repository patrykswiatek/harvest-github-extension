import { type FC } from 'react'

import componentStyles from '@/components/form/text-input/TextInput.module.scss'
import formInputStyles from '@/styles/form-element.module.scss'
import type { TextInputProps } from '@/types/props/text-input.props'

const TextInput: FC<TextInputProps> = ({
  className,
  label,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <div className={`${componentStyles.TextInput} ${className ?? ''}`}>
      {label && (
        <label className={formInputStyles['input-label']} htmlFor='input'>
          {label}
        </label>
      )}
      <input
        className={formInputStyles['form-element']}
        id='input'
        type={type}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  )
}

export default TextInput
