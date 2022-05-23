import { useLocation, useNavigate } from 'react-router-dom'

const useHandleReturnUrl = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleReturnUrl = () => {
    const pathFromState = (location.state as { from: { pathname: string } })?.from?.pathname
    const returnUrl = localStorage.getItem('returnUrl')
    navigate(pathFromState || returnUrl || '/')
    localStorage.removeItem('returnUrl')
  }

  return { handleReturnUrl }
}

export { useHandleReturnUrl }
