import React, { FC, useState } from 'react'

import { SelectContext } from '@/contexts/select.context'
import { SelectProps } from '@/types/props/select.props'

const Select: FC<SelectProps> = ({ children, defaultValue, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue)
  const [showDropdown, setShowDropdown] = useState(false)

  const selectPlaceholder = placeholder || 'Choose an option'

  const updateSelectedOption = (option: number) => {
    setSelectedOption(option)
    setShowDropdown(false)
  }

  const showDropdownHandler = () => {
    setShowDropdown((showDropdown) => !showDropdown)
  }

  return (
    <SelectContext.Provider value={{ selectedOption, updateSelectedOption }}>
      <div
        className={showDropdown ? 'selected-text active' : 'selected-text'}
        onClick={showDropdownHandler}
      >
        {selectedOption ?? selectPlaceholder}
      </div>
      <ul>{children}</ul>
    </SelectContext.Provider>
  )
}

export default Select
