import { useState } from 'react'

const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  const reset_func = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    reset_func
  }
}

export default useField
