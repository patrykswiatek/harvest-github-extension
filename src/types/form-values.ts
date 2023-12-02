import { SelectOption } from '@/types/props/select.props'

export enum FormField {
  Date = 'Date',
  Hours = 'Hours',
  Notes = 'Notes',
  Project = 'Project',
  PullRequest = 'Pull Request',
  Task = 'Task',
}

export interface FormValues {
  [FormField.Date]: string
  [FormField.Project]: SelectOption | undefined
  [FormField.PullRequest]: SelectOption | undefined
  [FormField.Hours]: string
  [FormField.Notes]: string
  [FormField.Task]: SelectOption | undefined
}

export type FormValueTypeByField<T> = T extends keyof FormValues
  ? FormValues[T]
  : never
