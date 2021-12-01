/* eslint-disable @delagen/deprecation/deprecation */
import { Link, LinkProps } from '@mui/material'
import React from 'react'
import { Link as RouterLink, To } from 'react-router-dom'

/** @deprecated Moved to @xylabs/sdk-react */
interface Props extends LinkProps {
  to: To
}

/** @deprecated Moved to @xylabs/sdk-react */
const LinkToEx: React.FC<Props> = ({ to, ...props }) => {
  return <Link component={RouterLink} to={to} {...props} />
}

export default LinkToEx
