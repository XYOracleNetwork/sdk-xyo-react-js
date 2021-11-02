import { createContext } from 'react'

const Context = createContext<{
  accepted?: boolean
  setAccepted?: (accepted: boolean) => void
  clearAccepted?: () => void
  storageName?: string
}>({})
export default Context
