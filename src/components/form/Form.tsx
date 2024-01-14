import { type FC, FormEvent, useEffect, useMemo, useState } from 'react'

import { createTaskAssignment, trackTimeViaDuration } from '@/api'
import Alert from '@/components/alert/Alert'
import Button from '@/components/button/Button'
import styles from '@/components/form/Form.module.scss'
import TextInput from '@/components/form/text-input/TextInput'
import Select from '@/components/select/Select'
import {
  FormField,
  FormValueTypeByField,
  FormValues,
} from '@/types/form-values'
import type {
  FormProps,
  SelectItem,
  TextInputItem,
} from '@/types/props/form.props'
import { getCurrentDate } from '@/utils/get-current-date'
import { isObjectWithProperty } from '@/utils/is-object-with-property'
import { timeToDecimal } from '@/utils/time-to-decimal'

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
  const [showMessage, setShowMessage] = useState({
    error: false,
    success: false,
  })

  const { pullRequests, projects, tasks, isLoading } = data

  const isFormValid = useMemo(
    () => Object.values(formValues).every((value) => !!value),
    [formValues]
  )

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
    return pullRequests.find(({ title }) => activeTabTitle?.includes(title))
  }

  const setInitialFormValues = () => {
    const activeTabPullRequest = getPullRequestTitleBasedOnTab()

    setFormValues((formValues) => ({
      ...formValues,
      [FormField.Date]: getCurrentDate(),
      [FormField.PullRequest]: activeTabPullRequest ?? pullRequests?.[0],
      [FormField.Project]: projects?.[0],
      [FormField.Task]: tasks?.[0],
      [FormField.Hours]: '',
      [FormField.Notes]: pullRequests?.[0]?.title ?? '',
    }))
  }

  const handleMessage = (type: keyof typeof showMessage) => {
    setShowMessage((showMessage) => ({ ...showMessage, [type]: true }))

    setTimeout(() => {
      setShowMessage((showMessage) => ({ ...showMessage, [type]: false }))
    }, 3000)
  }

  const onSubmitForm = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!isFormValid) return

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
      .then(() => handleMessage('success'))
      .catch(() => handleMessage('error'))
      .finally(() => setInitialFormValues())
  }

  const $formContent = useMemo(() => {
    switch (true) {
      case showMessage.error:
        return (
          <Alert type='error' text='Something went wrong. Try again later.' />
        )
      case showMessage.success:
        return <Alert type='success' text='Success!' />
      default:
        return (
          <Button
            className={styles.button}
            type='submit'
            text='Submit'
            disabled={!isFormValid}
            handleClick={onSubmitForm}
          />
        )
    }
  }, [isFormValid, showMessage.error, showMessage.success, onSubmitForm])

  useEffect(() => {
    if (!isLoading) setInitialFormValues()
  }, [isLoading])

  return (
    <form className={styles.Form}>
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
          className={isShort ? styles['text-input-short'] : ''}
          label={id}
          type={type}
          value={formValues[id]}
          onChange={(time) => onChangeFormValue<typeof id>(id, time)}
        />
      ))}
      <div className={styles['button-wrapper']}>{$formContent}</div>
    </form>
  )
}

export default Form
