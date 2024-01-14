import { FormField } from '@/types/form-values'
import { SelectOption, SelectProps } from '@/types/props/select.props'
import { TextInputProps } from '@/types/props/text-input.props'

export interface SelectItem extends Pick<SelectProps, 'options'> {
  id: FormField.Project | FormField.PullRequest | FormField.Task
}

export interface TextInputItem extends Pick<TextInputProps, 'type'> {
  id: FormField.Hours | FormField.Date | FormField.Notes
  isShort?: boolean
}

export interface FormProps {
  activeTabTitle?: string
  data: Record<'pullRequests' | 'projects' | 'tasks', SelectOption[]> & {
    isLoading: boolean
  }
}
