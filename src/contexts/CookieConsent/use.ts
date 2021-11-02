import { useContext } from 'react'

import Context from './Context'

const useCookieConsent = () => {
  return useContext(Context)
}

export default useCookieConsent
