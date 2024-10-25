import type { PropsWithChildren, ProviderProps } from 'react'
import React, { useMemo, useState } from 'react'

import type { WebAppNavigationType } from '../../WebAppNavigationType.ts'
import type { AppSettingsContextProps } from './Context.ts'
import { AppSettingsContext } from './Context.ts'
import { AppSettingsStorage } from './Storage.ts'

export interface AppSettingsProviderProps<T extends AppSettingsContextProps = AppSettingsContextProps> extends ProviderProps<T> {
  storage?: AppSettingsStorage
}

export const AppSettingsProvider: React.FC<PropsWithChildren<AppSettingsProviderProps>> = ({
  storage,
  value,
  children,
  ...props
}) => {
  const storageMemo = useMemo(() => storage ?? new AppSettingsStorage(), [storage])
  const [developerMode, setDeveloperMode] = useState(storageMemo.developerMode)
  const [darkMode, setDarkMode] = useState(storageMemo.darkMode)
  const [navigationType, setNavigationType] = useState(storageMemo.navigationType)
  const [navigationCollapsed, setNavigationCollapsed] = useState(storageMemo.navigationCollapsed)
  const [seedPhrase, setSeedPhrase] = useState(storageMemo.seedPhrase)
  const [maxAccounts, setMaxAccounts] = useState(storageMemo.maxAccounts)

  const enableDeveloperMode = (value: boolean) => {
    storageMemo.developerMode = value
    setDeveloperMode(storageMemo.developerMode)
  }

  const enableDarkMode = (value: boolean) => {
    storageMemo.darkMode = value
    setDarkMode(storageMemo.darkMode)
  }

  const changeNavigationType = (value: WebAppNavigationType) => {
    storageMemo.navigationType = value
    setNavigationType(value)
  }

  const changeNavigationCollapsed = (value: boolean) => {
    storageMemo.navigationCollapsed = value
    setNavigationCollapsed(value)
  }

  const changeSeedPhrase = (value: string) => {
    storageMemo.seedPhrase = value
    setSeedPhrase(value)
  }

  const changeMaxAccounts = (value: number) => {
    storageMemo.maxAccounts = value
    setMaxAccounts(value)
  }

  return (
    <AppSettingsContext.Provider
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
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
