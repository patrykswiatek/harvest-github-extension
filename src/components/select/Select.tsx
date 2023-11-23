import React, { useState } from 'react'
import type { FC, MouseEvent } from 'react'

import { SelectOption, SelectProps } from '@/types/props/select.props'

import './Select.css'

const Select: FC<SelectProps> = ({ options, selected, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = (event: MouseEvent<HTMLElement>, isOpened: boolean) => {
    event.preventDefault()
    setShowDropdown(isOpened)
  }

  const handleChange = (event: MouseEvent<HTMLElement>, option: SelectOption) => {
    toggleDropdown(event, false)
    onChange(option)
  }

  return (
    <div className='select'>
      <button
        className='select-button'
        role='combobox'
        aria-labelledby='select button'
        aria-haspopup='listbox'
        aria-expanded={showDropdown}
        aria-controls='select-dropdown'
        onClick={(event) => toggleDropdown(event, true)}
      >
        {selected?.title || options[0]?.title}
      </button>
      <ul role='listbox' id='select-dropdown' className='list'>
        {options?.map(({ id, title }, index) => (
          <li
            key={index}
            role='option'
            value={id}
            onClick={(e) => handleChange(e, { id, title })}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
