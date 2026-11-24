import React, { useEffect, useState } from 'react'
import { fetchJson } from './fetch'


export default function Select(prop) {

  return (
    <select value={prop.value} onChange={prop.onChange}>
      <option value='' hidden>{prop.fromOrTo || ''}</option>
      {prop.options.map(([code, name]) => <option key={code} value={code}>{code + ' - ' + name}</option>)}
    </select>
  )
}


