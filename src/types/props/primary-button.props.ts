import { ComponentProps } from 'react'

export interface PrimaryButtonProps
  extends Pick<ComponentProps<'button'>, 'className' | 'type'> {
  text: string
  handleClick: ComponentProps<'button'>['onClick']
}
