/* eslint-disable @delagen/deprecation/deprecation */
import { useContext } from 'react'

import Context from './Context'

/** @deprecated Moved to @xylabs/sdk-react */
const useCookieConsent = () => {
  return useContext(Context)
}

export default useCookieConsent
