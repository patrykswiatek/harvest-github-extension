import React, { FC, FormEvent, useMemo, useState } from 'react'

import { createTask, createTaskAssignment, trackTimeViaDuration } from '@/api'
import Form from '@/components/form/Form'
import { useFormData } from '@/hooks/use-form-data'
import {
  FormField,
  FormValueTypeByField,
  FormValues,
} from '@/types/form-values'
import { FormProps } from '@/types/props/form.props'
import { timeToDecimal } from '@/utils/time-to-decimal'

import '@/styles/global.css'
import '@/App.css'

const App: FC = () => {
  const { openPullRequests, projects } = useFormData()

  const [formValues, setFormValues] = useState<FormValues>({
    [FormField.PullRequest]: openPullRequests?.[0],
    [FormField.Project]: projects?.[0],
    [FormField.Hours]: '',
  })

  const onChangeFormValue = <T extends FormField>(
    field: keyof FormValues,
    value: FormValueTypeByField<T>
  ) => {
    setFormValues((formValues) => ({ ...formValues, [field]: value }))
  }

  const onSubmitForm = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // Ensure all required form fields have values; if not, exit early
    if (
      !formValues[FormField.PullRequest] ||
      !formValues[FormField.Project] ||
      !formValues[FormField.Hours]
    ) {
      console.error('Required form fields are missing')
      return
    }

    const name = formValues[FormField.PullRequest]?.title ?? ''

    // // TODO:
    const task = await createTask({ name: `${name}${Math.random()}` })
    const taskData = {
      project_id: formValues[FormField.Project]?.id,
      task_id: task.data.id,
    }

    Promise.all([
      await createTaskAssignment(taskData),
      trackTimeViaDuration({
        ...taskData,
        spent_date: new Date().toISOString(),
        hours: timeToDecimal(formValues[FormField.Hours]),
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
    ],
    [JSON.stringify(openPullRequests), JSON.stringify(projects)]
  )

  return (
    <div className='App'>
      <Form
        formValues={formValues}
        selectItems={selectItems}
        onSubmitForm={onSubmitForm}
        onChangeFormValue={onChangeFormValue}
      />
    </div>
  )
}

export default App
