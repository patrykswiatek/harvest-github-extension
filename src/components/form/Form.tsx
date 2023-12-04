import { type FC, FormEvent, useEffect, useMemo, useState } from 'react'

import { createTaskAssignment, trackTimeViaDuration } from '@/api'
import Button from '@/components/button/Button'
import TextInput from '@/components/form/text-input/TextInput'
import Select from '@/components/select/Select'
import {
  FormField,
  FormValueTypeByField,
  FormValues,
} from '@/types/form-values'
import type { FormProps, SelectItem, TextInputItem } from '@/types/props/form.props'
import { getCurrentDate } from '@/utils/get-current-date'
import { isObjectWithProperty } from '@/utils/is-object-with-property'
import { timeToDecimal } from '@/utils/time-to-decimal'
import '@/components/form/Form.css'

const TEXT_INPUT_ITEMS: TextInputItem[] = [
  {
    id: FormField.Hours,
    type: 'time',
    isShort: true,
  },
  {
    id: FormField.Date,
    type: 'date',
    isShort: true,
  },
  {
    id: FormField.Notes,
    type: 'text',
  },
]

const Form: FC<FormProps> = ({ activeTabTitle, data }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    [FormField.Date]: '',
    [FormField.PullRequest]: undefined,
    [FormField.Project]: undefined,
    [FormField.Task]: undefined,
    [FormField.Hours]: '',
    [FormField.Notes]: '',
  })

  const { pullRequests, projects, tasks, isLoading } = data

  const selectItems: SelectItem[] = useMemo(
    () => [
      {
        id: FormField.PullRequest,
        options: pullRequests,
      },
      {
        id: FormField.Project,
        options: projects,
      },
      {
        id: FormField.Task,
        options: tasks,
      },
    ],
    [
      JSON.stringify(pullRequests),
      JSON.stringify(projects),
      JSON.stringify(tasks),
    ]
  )

  const onChangeFormValue = <T extends FormField>(
    field: T,
    value: FormValueTypeByField<T>
  ) => {
    const shouldUpdateNotes =
      field === FormField.PullRequest && isObjectWithProperty(value, 'title')

    setFormValues((formValues) => ({
      ...formValues,
      [field]: value,
      ...(shouldUpdateNotes && { [FormField.Notes]: String(value?.title) }),
    }))
  }

  const getPullRequestTitleBasedOnTab = () => {
    return pullRequests.find(({ title }) => {
      return activeTabTitle?.includes(title)
    })
  }

  const setInitialInputValues = () => {
    const activeTabPullRequest = getPullRequestTitleBasedOnTab()

    setFormValues((formValues) => ({
      ...formValues,
      [FormField.Date]: getCurrentDate(),
      [FormField.PullRequest]: activeTabPullRequest ?? pullRequests?.[0],
      [FormField.Project]: projects?.[0],
      [FormField.Task]: tasks?.[0],
      [FormField.Hours]: '00:00',
      [FormField.Notes]: pullRequests?.[0]?.title ?? '',
    }))
  }

  const onSubmitForm = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const hasAllValues = Object.values(formValues).every((value) => !!value)

    // Ensure all required form fields have values; if not, exit early
    if (!hasAllValues) {
      console.error('Required form fields are missing')
      return
    }

    const taskData = {
      project_id: formValues[FormField.Project]?.id ?? 0,
      task_id: formValues[FormField.Task]?.id ?? 0,
    }

    Promise.all([
      await createTaskAssignment(taskData),
      trackTimeViaDuration({
        ...taskData,
        spent_date: new Date(formValues[FormField.Date]).toISOString(),
        hours: timeToDecimal(formValues[FormField.Hours]),
        notes: formValues[FormField.Notes],
      }),
    ])
  }

  useEffect(() => {
    if (!isLoading) {
      setInitialInputValues()
    }
  }, [isLoading])

  return (
    <form className='Form'>
      {selectItems.map(({ id, options }) => (
        <Select
          key={id}
          label={id}
          options={options}
          selected={formValues[id]}
          onChange={(option) => onChangeFormValue<typeof id>(id, option)}
        />
      ))}
      {TEXT_INPUT_ITEMS.map(({ id, isShort, type }) => (
        <TextInput
          key={id}
          className={isShort ? 'small-width' : ''}
          label={id}
          type={type}
          value={formValues[id]}
          onChange={(time) => onChangeFormValue<typeof id>(id, time)}
        />
      ))}
      <Button
        className='submit-btn'
        type='submit'
        text='Submit'
        handleClick={onSubmitForm}
      />
    </form>
  )
}

export default Form
