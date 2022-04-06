import { createContext } from 'react'

import { appSettingDefault } from './appSettingDefault'

export interface AppSettingsContextProps {
  darkMode?: boolean
  developerMode?: boolean
  enableDarkMode?: (value: boolean) => void
  enableDeveloperMode?: (value: boolean) => void
}

export const AppSettingsContext = createContext<AppSettingsContextProps>(appSettingDefault())
