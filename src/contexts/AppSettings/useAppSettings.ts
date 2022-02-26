import { useContext } from 'react'

import { AppSettingsContext } from './Context'

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext)
  return context
}
