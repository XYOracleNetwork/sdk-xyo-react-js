import { useContext } from 'react'

import { AppSettingsContext } from './Context.ts'

export const useAppSettings = () => {
  return useContext(AppSettingsContext)
}
