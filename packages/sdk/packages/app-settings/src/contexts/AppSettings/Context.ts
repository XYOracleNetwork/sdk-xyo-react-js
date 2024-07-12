import { createContext } from 'react'

import { WebAppNavigationType } from '../../WebAppNavigationType.js'
import { appSettingDefault } from './appSettingDefault.js'

export interface AppSettingsContextProps {
  changeMaxAccounts?: (value: number) => void
  changeNavigationCollapsed?: (value: boolean) => void
  changeNavigationType?: (value: WebAppNavigationType) => void
  changeSeedPhrase?: (value: string) => void
  darkMode?: boolean
  developerMode?: boolean
  enableDarkMode?: (value: boolean) => void
  enableDeveloperMode?: (value: boolean) => void
  maxAccounts?: number
  navigationCollapsed?: boolean
  navigationType?: WebAppNavigationType
  seedPhrase?: string
}

export const AppSettingsContext = createContext<AppSettingsContextProps>(appSettingDefault())
