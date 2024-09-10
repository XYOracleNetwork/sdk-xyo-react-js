import type { To } from 'react-router-dom'

export const navigateWithUsername = (xnsName: string, paramsString: string, navigate?: ((to: string) => void), to?: To) => {
  // avoid duplicating the username param
  const params = new URLSearchParams(paramsString)
  const usernameParam = params.get('username')
  if (usernameParam) {
    // if username param is the same as the xnsName, navigate
    if (usernameParam === xnsName) {
      navigate?.(`${to}?${paramsString}`)
    }
    if (usernameParam !== xnsName) {
      // if username param is different, replace it
      params.set('username', xnsName)
      navigate?.(`${to}?${params.toString()}`)
    }
  } else {
    // if no username param, include it
    navigate?.(`${to}?username=${xnsName}&${paramsString}`)
  }
}
