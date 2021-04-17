import React from 'react'
import { Redirect, RedirectProps } from 'react-router-dom'

const RedirectWithQuery: React.ComponentType<RedirectProps> = (props) => {
  const to = `${props.to}${document.location.search}`
  return <Redirect {...props} to={to} />
}

export default RedirectWithQuery
