export type SelectContextProviderValue =
  | {
      selectedOption?: number
      updateSelectedOption: (option: number) => void
    }
  | undefined
