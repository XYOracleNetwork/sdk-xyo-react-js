import type { PropsWithChildren } from 'react'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { PluginPropsContext } from './context.ts'
import type { PluginProps, PluginPropsState } from './state.ts'

export interface PluginPropsProviderProps extends PropsWithChildren {
  pluginProps?: PluginProps
}

export const PluginPropsProvider: React.FC<PluginPropsProviderProps> = ({ children, pluginProps: pluginPropsProp }) => {
  const [pluginProps, setPluginProps] = useState<PluginProps | undefined>(pluginPropsProp)

  useEffect(() => {
    // needs to be in useEffect since we are in a provider
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setPluginProps(pluginPropsProp)
  }, [pluginPropsProp])

  const value: PluginPropsState = useMemo(() => ({
    pluginProps,
    provided: true,
  }), [pluginProps])

  return (
    <PluginPropsContext value={value}>
      {children}
    </PluginPropsContext>
  )
}
