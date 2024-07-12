import { WithChildren } from '@xylabs/react-shared'
import { ProviderProps, useState } from 'react'

import { WebAppNavigationType } from '../../WebAppNavigationType.js'
import { AppSettingsContext, AppSettingsContextProps } from './Context.js'
import { AppSettingsStorage } from './Storage.js'

export interface AppSettingsProviderProps<T extends AppSettingsContextProps = AppSettingsContextProps> extends ProviderProps<T> {
  storage?: AppSettingsStorage
}

export const AppSettingsProvider: React.FC<WithChildren<AppSettingsProviderProps>> = ({
  storage = new AppSettingsStorage(),
  value,
  children,
  ...props
}) => {
  const [developerMode, setDeveloperMode] = useState(storage.developerMode)
  const [darkMode, setDarkMode] = useState(storage.darkMode)
  const [navigationType, setNavigationType] = useState(storage.navigationType)
  const [navigationCollapsed, setNavigationCollapsed] = useState(storage.navigationCollapsed)
  const [seedPhrase, setSeedPhrase] = useState(storage.seedPhrase)
  const [maxAccounts, setMaxAccounts] = useState(storage.maxAccounts)

  const enableDeveloperMode = (value: boolean) => {
    storage.developerMode = value
    setDeveloperMode(storage.developerMode)
  }

  const enableDarkMode = (value: boolean) => {
    storage.darkMode = value
    setDarkMode(storage.darkMode)
  }

  const changeNavigationType = (value: WebAppNavigationType) => {
    storage.navigationType = value
    setNavigationType(value)
  }

  const changeNavigationCollapsed = (value: boolean) => {
    storage.navigationCollapsed = value
    setNavigationCollapsed(value)
  }

  const changeSeedPhrase = (value: string) => {
    storage.seedPhrase = value
    setSeedPhrase(value)
  }

  const changeMaxAccounts = (value: number) => {
    storage.maxAccounts = value
    setMaxAccounts(value)
  }

  return (
    <AppSettingsContext.Provider
      value={{
        changeMaxAccounts,
        changeNavigationCollapsed,
        changeNavigationType,
        changeSeedPhrase,
        darkMode,
        developerMode,
        enableDarkMode,
        enableDeveloperMode,
        maxAccounts,
        navigationCollapsed,
        navigationType,
        seedPhrase,

        ...value,
      }}
      {...props}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}
