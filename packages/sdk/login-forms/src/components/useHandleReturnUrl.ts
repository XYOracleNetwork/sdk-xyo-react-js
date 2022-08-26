import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const LocalStorageKey = 'XyoSettingState|returnUrl'

const useHandleReturnUrl = () => {
  const location = useLocation()
  const [params, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleReturnUrl = () => {
    const pathFromState = (location.state as { from: { pathname: string } })?.from?.pathname
    const pathFromSearchParam = params.get('returnUrl')
    const returnUrl = localStorage.getItem(LocalStorageKey)

    navigate(pathFromState || pathFromSearchParam || returnUrl || ' ')

    localStorage.removeItem(LocalStorageKey)
    params.delete(LocalStorageKey)
    setSearchParams(params)
  }

  return { handleReturnUrl }
}

export { useHandleReturnUrl }
