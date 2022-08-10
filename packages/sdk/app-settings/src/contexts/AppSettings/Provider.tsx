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
  const [navigationType, setNaviagtionType] = useState(storage.navigationType)

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
    setNaviagtionType(value)
  }

  return (
    <AppSettingsContext.Provider
      value={{
        changeNavigationType,
        darkMode,
        developerMode,
        enableDarkMode,
        enableDeveloperMode,
        navigationType,

        ...value,
      }}
      {...props}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}
