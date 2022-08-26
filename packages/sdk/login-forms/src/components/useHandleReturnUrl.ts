import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const useHandleReturnUrl = () => {
  const location = useLocation()
  const [params, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleReturnUrl = () => {
    const pathFromState = (location.state as { from: { pathname: string } })?.from?.pathname
    const pathFromSearchParam = params.get('returnUrl')
    const returnUrl = localStorage.getItem('returnUrl')

    navigate(pathFromState || pathFromSearchParam || returnUrl || ' ')

    localStorage.removeItem('returnUrl')
    params.delete('returnUrl')
    setSearchParams(params)
  }

  return { handleReturnUrl }
}

export { useHandleReturnUrl }
