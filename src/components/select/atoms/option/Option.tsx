import type { FC } from 'react'

import { useSelectContext } from '@/contexts/select.context';
import { OptionProps } from '@/types/props/option.props'

const Option: FC<OptionProps> = ({ children, value }) => {
  const { updateSelectedOption } = useSelectContext();

  return <li onClick={() => updateSelectedOption(value)}>{children}</li>
}

export default Option
