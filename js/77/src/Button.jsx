import React from 'react'

export default function Button(props) {
  const arrows = {
    right: '\u2192',
    left: '\u2190'
  }
  return (
    <button onClick={props.onClick} >{arrows[props.kind]}</button>
  )
}
