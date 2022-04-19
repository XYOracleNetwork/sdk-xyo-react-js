import { WithChildren } from '@xylabs/sdk-react'
import React, { ProviderProps, useState } from 'react'

import { AppSettingsContext, AppSettingsContextProps } from './Context'
import { AppSettingsStorage } from './Storage'

export interface AppSettingsProviderProps<T extends AppSettingsContextProps = AppSettingsContextProps> extends ProviderProps<T> {
  storage?: AppSettingsStorage
}

export const AppSettingsProvider: React.FC<WithChildren<AppSettingsProviderProps>> = ({ storage = new AppSettingsStorage(), value, children, ...props }) => {
  const [developerMode, setDeveloperMode] = useState(storage.developerMode)
  const [darkMode, setDarkMode] = useState(storage.darkMode)

  const enableDeveloperMode = (value: boolean) => {
    storage.developerMode = value
    setDeveloperMode(storage.developerMode)
  }

  const enableDarkMode = (value: boolean) => {
    storage.darkMode = value
    setDarkMode(storage.darkMode)
  }

  return (
    <AppSettingsContext.Provider
      value={{
        darkMode,
        developerMode,
        enableDarkMode,
        enableDeveloperMode,

        ...value,
      }}
      {...props}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}
