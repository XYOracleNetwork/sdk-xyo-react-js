import React, { useEffect } from 'react'
import { To, useNavigate } from 'react-router-dom'

interface RedirectProps {
  to: To
}

const RedirectWithQuery: React.ComponentType<RedirectProps> = ({ to }) => {
  const newUrl = `${to}${document.location.search}`
  const navigate = useNavigate()

  useEffect(() => {
    navigate(newUrl, { replace: true })
  })

  return <div />
}

export default RedirectWithQuery
