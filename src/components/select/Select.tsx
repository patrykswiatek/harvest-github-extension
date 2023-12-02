import React, { useState } from 'react'
import type { FC, MouseEvent } from 'react'

import { SelectOption, SelectProps } from '@/types/props/select.props'

import '@/components/select/Select.css'
import '@/styles/form-element.css'

const Select: FC<SelectProps> = ({ className, label, options, selected, onChange }) => {
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
    <div className={`Select ${className}`}>
      {label && <label className='input-label' htmlFor="select">{label}</label>}
      <div className='select-container' id="select">
        <button
          className='select-button form-element'
          role='combobox'
          aria-labelledby='select button'
          aria-haspopup='listbox'
          aria-expanded={showDropdown}
          aria-controls='select-dropdown'
          onClick={(event) => toggleDropdown(event, true)}
        >
          {selected?.title || options[0]?.title}
        </button>
        <ul role='listbox' id='select-dropdown' className='list form-element'>
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
