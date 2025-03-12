import { use } from 'react'

import { AppSettingsContext } from './Context.ts'

/** @deprecated import from @xylabs/react-app-settings instead */
export const useAppSettings = () => {
  return use(AppSettingsContext)
}
