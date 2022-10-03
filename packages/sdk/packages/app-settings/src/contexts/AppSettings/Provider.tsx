import { WithChildren } from '@xylabs/react-shared'
import { ProviderProps, useState } from 'react'

import { WebAppNavigationType } from '../../WebAppNavigationType'
import { AppSettingsContext, AppSettingsContextProps } from './Context'
import { AppSettingsStorage } from './Storage'

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

  return (
    <AppSettingsContext.Provider
      value={{
        changeNavigationCollapsed,
        changeNavigationType,
        darkMode,
        developerMode,
        enableDarkMode,
        enableDeveloperMode,
        navigationCollapsed,
        navigationType,

        ...value,
      }}
      {...props}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}
