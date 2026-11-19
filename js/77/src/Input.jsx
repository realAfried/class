import React from 'react'

export default function Input(prop) {
  return (
    <input value={prop.value} onChange={prop.onChange} type="number" min={1} />
  )
}
