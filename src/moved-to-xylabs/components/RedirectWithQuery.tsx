/* eslint-disable @delagen/deprecation/deprecation */
import React, { useEffect } from 'react'
import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom'

interface RedirectProps {
  to: To
  toOptions?: NavigateOptions
}

/** @deprecated Moved to @xylabs/sdk-react */
const RedirectWithQuery: React.ComponentType<RedirectProps> = ({ to, toOptions }) => {
  const newPath = `${to}${document.location.search}`
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (newPath !== pathname) {
      navigate(newPath, { replace: true, ...toOptions })
    }
  })

  return <div />
}

export default RedirectWithQuery
