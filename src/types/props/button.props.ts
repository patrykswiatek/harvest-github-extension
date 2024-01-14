import { ComponentProps } from 'react'

export interface ButtonProps
  extends Pick<ComponentProps<'button'>, 'className' | 'type' | 'disabled'> {
  text: string
  handleClick: ComponentProps<'button'>['onClick']
}
