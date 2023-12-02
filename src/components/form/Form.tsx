import { type FC } from 'react'

import TextInput from '@/components/form/text-input/TextInput'
import PrimaryButton from '@/components/primary-button/PrimaryButton'
import Select from '@/components/select/Select'
import type { FormProps } from '@/types/props/form.props'
import './Form.css'

const Form: FC<FormProps> = ({
  formValues,
  selectItems,
  textInputItems,
  onSubmitForm,
  onChangeFormValue,
}) => {
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
      {textInputItems.map(({ id, isShort, type }) => (
        <TextInput
          className={isShort ? 'small-width' : ''}
          label={id}
          type={type}
          value={formValues[id]}
          onChange={(time) => onChangeFormValue<typeof id>(id, time)}
        />
      ))}
      <PrimaryButton className='submit-btn' type='submit' text='Submit' handleClick={onSubmitForm} />
    </form>
  )
}

export default Form
