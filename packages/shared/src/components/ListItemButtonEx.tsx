import { ListItemButton, ListItemButtonProps } from '@mui/material'
import { MouseEvent } from 'react'
import { NavigateOptions, To, useNavigate } from 'react-router-dom'

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
  if (to) {
    return <ListItemButtonExTo to={to} {...props} />
  } else {
    return <ListItemButton {...props} />
  }
}
