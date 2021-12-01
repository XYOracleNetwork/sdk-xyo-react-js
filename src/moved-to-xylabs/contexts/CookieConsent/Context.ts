/* eslint-disable @delagen/deprecation/deprecation */
import { createContext } from 'react'

/** @deprecated Moved to @xylabs/sdk-react */
const Context = createContext<{
  accepted?: boolean
  setAccepted?: (accepted: boolean) => void
  clearAccepted?: () => void
  storageName?: string
}>({})
export default Context
