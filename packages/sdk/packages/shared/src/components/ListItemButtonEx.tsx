import type { ListItemButtonProps } from '@mui/material'
import { ListItemButton } from '@mui/material'
import type { MouseEvent } from 'react'
import React from 'react'
import type { NavigateOptions, To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export interface ListItemButtonExProps extends ListItemButtonProps {
  target?: string
  to?: To
  toOptions?: NavigateOptions
}

export const ListItemButtonExTo: React.FC<ListItemButtonExProps> = ({ to, toOptions, onClick, ...props }) => {
  const navigate = useNavigate()
  const localOnClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (to) {
      navigate(to, toOptions)
    }
  }

  return <ListItemButton onClick={localOnClick} {...props} />
}

export const ListItemButtonEx: React.FC<ListItemButtonExProps> = ({ to, ...props }) => {
  return to ? <ListItemButtonExTo to={to} {...props} /> : <ListItemButton {...props} />
}
