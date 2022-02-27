import { createContext } from 'react'

import { XyoNetworkPreset } from '../../lib'
import { appSettingDefault } from './appSettingDefault'

export interface AppSettingsContextProps {
  archive?: string
  darkMode?: boolean
  developerMode?: boolean
  network?: XyoNetworkPreset
  enableDarkMode?: (value: boolean) => void
  enableDeveloperMode?: (value: boolean) => void
  changeArchive?: (value: string) => void
  changeNetwork?: (value: XyoNetworkPreset) => void
}

export const AppSettingsContext = createContext<AppSettingsContextProps>(appSettingDefault())
