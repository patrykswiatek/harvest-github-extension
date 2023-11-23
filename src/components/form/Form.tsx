import type { FC } from 'react'

import Select from '@/components/select/Select'
import { FormField } from '@/types/form-values'
import type { FormProps } from '@/types/props/form.props'

import './Form.css'

const Form: FC<FormProps> = ({
  formValues,
  selectItems,
  onSubmitForm,
  onChangeFormValue,
}) => {
  return (
    <form className='Form'>
      {selectItems.map(({ id, options }) => (
        <Select
          key={id}
          options={options}
          selected={formValues[id]}
          onChange={(option) => onChangeFormValue<typeof id>(id, option)}
        />
      ))}
      <input
        className='input'
        type='time'
        placeholder='Enter time'
        value={formValues[FormField.Hours]}
        onChange={({ target }) =>
          onChangeFormValue<FormField.Hours>(FormField.Hours, target.value)
        }
      />
      <button type='submit' onClick={onSubmitForm}>
        Submit
      </button>
    </form>
  )
}

export default Form
