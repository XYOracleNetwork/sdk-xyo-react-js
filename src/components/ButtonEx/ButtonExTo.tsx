import React, { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonExBase from './ButtonExBase'
import ButtonExProps from './ButtonExProps'

const ButtonExTo: React.FC<ButtonExProps> = ({ to, toOptions, onClick, ...props }) => {
  const navigate = useNavigate()
  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (to) {
      navigate(to, toOptions)
    }
  }

  return <ButtonExBase onClick={localOnClick} {...props} />
}

export default ButtonExTo
