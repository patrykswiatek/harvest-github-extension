import React, { FC, FormEvent, useEffect, useMemo, useState } from 'react'

import { createTaskAssignment, trackTimeViaDuration } from '@/api'
import Form from '@/components/form/Form'
import { useFormData } from '@/hooks/use-form-data'
import {
  FormField,
  FormValueTypeByField,
  FormValues,
} from '@/types/form-values'
import { FormProps } from '@/types/props/form.props'
import { getCurrentDate } from '@/utils/get-current-date'
import { isObjectWithProperty } from '@/utils/is-object-with-property'
import { timeToDecimal } from '@/utils/time-to-decimal'

import '@/styles/global.css'
import '@/App.css'

const TEXT_INPUT_ITEMS: FormProps['textInputItems'] = [
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

const App: FC = () => {
  const { openPullRequests, projects, tasks, isLoading } = useFormData()

  const [formValues, setFormValues] = useState<FormValues>({
    [FormField.Date]: '',
    [FormField.PullRequest]: undefined,
    [FormField.Project]: undefined,
    [FormField.Task]: undefined,
    [FormField.Hours]: '',
    [FormField.Notes]: '',
  })

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

  const selectItems: FormProps['selectItems'] = useMemo(
    () => [
      {
        id: FormField.PullRequest,
        options: openPullRequests,
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
      JSON.stringify(openPullRequests),
      JSON.stringify(projects),
      JSON.stringify(tasks),
    ]
  )

  const setInitialInputValues = () => {
    setFormValues((formValues) => ({
      ...formValues,
      [FormField.Date]: getCurrentDate(),
      [FormField.PullRequest]: openPullRequests?.[0],
      [FormField.Project]: projects?.[0],
      [FormField.Task]: tasks?.[0],
      [FormField.Hours]: '00:00',
      [FormField.Notes]: openPullRequests?.[0]?.title ?? '',
    }))
  }

  useEffect(() => {
    if (!isLoading) {
      setInitialInputValues()
    }
  }, [isLoading])

  return (
    <div className='App'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          formValues={formValues}
          selectItems={selectItems}
          textInputItems={TEXT_INPUT_ITEMS}
          onSubmitForm={onSubmitForm}
          onChangeFormValue={onChangeFormValue}
        />
      )}
    </div>
  )
}

export default App
