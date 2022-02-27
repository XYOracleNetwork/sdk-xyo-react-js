import React, { ProviderProps, useState } from 'react'

import { XyoNetworkPreset } from '../../lib'
import { AppSettingsContext, AppSettingsContextProps } from './Context'
import { AppSettingsStorage } from './Storage'

export interface AppSettingsProviderProps<T extends AppSettingsContextProps = AppSettingsContextProps>
  extends ProviderProps<T> {
  storage?: AppSettingsStorage
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({
  storage = new AppSettingsStorage(),
  value,
  children,
  ...props
}) => {
  const [developerMode, setDeveloperMode] = useState(storage.developerMode)
  const [darkMode, setDarkMode] = useState(storage.darkMode)
  const [network, setNetwork] = useState(storage.network)
  const [archive, setArchive] = useState(storage.archive)

  const enableDeveloperMode = (value: boolean) => {
    storage.developerMode = value
    setDeveloperMode(storage.developerMode)
  }

  const enableDarkMode = (value: boolean) => {
    storage.darkMode = value
    setDarkMode(storage.darkMode)
  }

  const changeNetwork = (value: XyoNetworkPreset) => {
    storage.network = value
    setNetwork(value)
  }

  const changeArchive = (value: string) => {
    storage.archive = value
    setArchive(value)
  }

  return (
    <AppSettingsContext.Provider
      value={{
        archive,
        changeArchive,
        changeNetwork,
        darkMode,
        developerMode,
        enableDarkMode,
        enableDeveloperMode,
        network,
        ...value,
      }}
      {...props}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}
