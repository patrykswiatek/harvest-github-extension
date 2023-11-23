export interface SelectOption {
  id: number
  title: string
}

export interface SelectProps {
  options: SelectOption[]
  selected: SelectOption | undefined
  onChange: (option: SelectOption) => void
}
