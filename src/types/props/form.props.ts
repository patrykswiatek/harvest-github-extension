import { FormEvent } from 'react'

import { FormField, FormValueTypeByField, FormValues } from '@/types/form-values'
import { SelectProps } from '@/types/props/select.props'

interface SelectItem extends Pick<SelectProps, 'options'> {
  id: FormField.Project | FormField.PullRequest
}

export interface FormProps {
  formValues: FormValues
  selectItems: SelectItem[]
  onSubmitForm: (e: FormEvent<HTMLButtonElement>) => void
  onChangeFormValue: <T extends FormField>(
    field: FormField,
    value: FormValueTypeByField<T>
  ) => void
}
