import { Link, LinkProps } from '@mui/material'
import React from 'react'
import { Link as RouterLink, To } from 'react-router-dom'

interface Props extends LinkProps {
  to: To
}

const LinkToEx: React.FC<Props> = ({ to, ...props }) => {
  return <Link component={RouterLink} to={to} {...props} />
}

export default LinkToEx
