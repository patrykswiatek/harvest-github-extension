import { ComponentProps } from 'react'

export interface ButtonProps
  extends Pick<ComponentProps<'button'>, 'className' | 'type'> {
  text: string
  handleClick: ComponentProps<'button'>['onClick']
}
