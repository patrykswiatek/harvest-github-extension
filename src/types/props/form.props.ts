import { FormEvent } from 'react'

import {
  FormField,
  FormValueTypeByField,
  FormValues,
} from '@/types/form-values'
import { SelectProps } from '@/types/props/select.props'
import { TextInputProps } from '@/types/props/text-input.props'

interface SelectItem extends Pick<SelectProps, 'options'> {
  id: FormField.Project | FormField.PullRequest | FormField.Task
}

interface TextInputItem extends Pick<TextInputProps, 'type'> {
  id: FormField.Hours | FormField.Date | FormField.Notes
  isShort?: boolean
}

export interface FormProps {
  formValues: FormValues
  selectItems: SelectItem[]
  textInputItems: TextInputItem[]
  onSubmitForm: (e: FormEvent<HTMLButtonElement>) => void
  onChangeFormValue: <T extends FormField>(
    field: T,
    value: FormValueTypeByField<T>
  ) => void
}
