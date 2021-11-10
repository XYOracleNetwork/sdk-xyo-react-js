import { ButtonBase } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonExProps from './ButtonExProps'

const ButtonExTo: React.FC<ButtonExProps> = ({ to, toOptions, onClick, ...props }) => {
  const navigate = useNavigate()
  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (to) {
      navigate(to, toOptions)
    }
  }

  return <ButtonBase onClick={localOnClick} {...props} />
}

export default ButtonExTo
