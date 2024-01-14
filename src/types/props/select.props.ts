import { ComponentProps } from 'react'

export interface SelectOption {
  id: number
  title: string
}

export interface SelectProps extends Pick<ComponentProps<'div'>, 'className'> {
  label?: string
  options: SelectOption[]
  selected: SelectOption | undefined
  onChange: (option: SelectOption) => void
}
