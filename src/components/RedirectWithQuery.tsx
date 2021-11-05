import React, { useEffect } from 'react'
import { To, useLocation, useNavigate } from 'react-router-dom'

interface RedirectProps {
  to: To
}

const RedirectWithQuery: React.ComponentType<RedirectProps> = ({ to }) => {
  const newPath = `${to}${document.location.search}`
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (newPath !== pathname) {
      navigate(newPath, { replace: true })
    }
  })

  return <div />
}

export default RedirectWithQuery
