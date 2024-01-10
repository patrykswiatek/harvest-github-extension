import { ComponentProps } from 'react'

export interface AlertProps
  extends Pick<ComponentProps<'p'>, 'className'> {
  text: string
  type: 'success' | 'error';
}
