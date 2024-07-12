import { useContext } from 'react'

import { AppSettingsContext } from './Context.js'

export const useAppSettings = () => {
  return useContext(AppSettingsContext)
}
