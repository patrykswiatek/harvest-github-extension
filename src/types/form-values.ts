import { SelectOption } from '@/types/props/select.props'

export enum FormField {
  Project = 'project',
  PullRequest = 'pullRequest',
  Hours = 'hours',
}

export interface FormValues {
  [FormField.Project]: SelectOption | undefined
  [FormField.PullRequest]: SelectOption | undefined
  [FormField.Hours]: string
}

export type FormValueTypeByField<T> = T extends keyof FormValues ? FormValues[T] : never
