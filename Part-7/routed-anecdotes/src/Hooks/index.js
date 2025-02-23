import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    if (type === 'number') {
      setValue(0)
    } else {
      setValue('')
    }
  }

  return {
    type,
    value,
    reset,
    onChange
  }
}
