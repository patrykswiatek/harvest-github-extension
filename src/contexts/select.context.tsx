import { createContext, useContext } from 'react'

import { SelectContextProviderValue } from '@/types/select-context-provider-value'

const SelectContext = createContext<SelectContextProviderValue>(undefined)

const useSelectContext = () => {
  const context = useContext(SelectContext)

  if (!context) {
    throw new Error('Error in creating the context')
  }

  return context
}

export { useSelectContext, SelectContext }
