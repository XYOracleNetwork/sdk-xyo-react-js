import { NavigateFunction } from 'react-router-dom'

const HandleReturnUrl = (navigate: NavigateFunction) => {
  const returnUrl = localStorage.getItem('returnUrl')
  navigate(returnUrl || '/')
  localStorage.removeItem('returnUrl')
}

export { HandleReturnUrl }
