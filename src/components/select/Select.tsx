import React, { useState } from 'react'
import type { FC, MouseEvent } from 'react'

import componentStyles from '@/components/select/Select.module.scss'
import formInputStyles from '@/styles/form-element.module.scss'
import { SelectOption, SelectProps } from '@/types/props/select.props'

const Select: FC<SelectProps> = ({
  className,
  label,
  options,
  selected,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = (
    event: MouseEvent<HTMLElement>,
    isOpened: boolean
  ) => {
    event.preventDefault()
    setShowDropdown(isOpened)
  }

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    option: SelectOption
  ) => {
    toggleDropdown(event, false)
    onChange(option)
  }

  return (
    <div className={`${componentStyles.Select} ${className ?? ''}`}>
      {label && (
        <label className={formInputStyles['input-label']} htmlFor='select'>
          {label}
        </label>
      )}
      <div className={componentStyles['select-wrapper']} id='select'>
        <button
          className={`${componentStyles['select-button']} ${formInputStyles['form-element']}`}
          role='combobox'
          aria-labelledby='select button'
          aria-haspopup='listbox'
          aria-expanded={showDropdown}
          aria-controls='select-dropdown'
          onClick={(event) => toggleDropdown(event, true)}
        >
          {selected?.title || options[0]?.title}
        </button>
        <ul
          className={`${componentStyles['select-list']} ${formInputStyles['form-element']}`}
          role='listbox'
          id='select-dropdown'
        >
          {options?.map((option, index) => (
            <li
              key={index}
              role='option'
              value={option.id}
              onClick={(event) => handleChange(event, option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
