import { ChangeEvent, ComponentProps } from 'react'

export interface TextInputProps extends Pick<ComponentProps<'div'>, 'className'> {
  label?: string
  type?: ComponentProps<'input'>['type']
  value: string
  onChange: (date: ChangeEvent<HTMLInputElement>['target']['value']) => void
}
