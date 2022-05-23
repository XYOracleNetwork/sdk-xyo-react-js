import { useContext } from 'react'

import { AppSettingsContext } from './Context'

export const useAppSettings = () => {
  return useContext(AppSettingsContext)
}
