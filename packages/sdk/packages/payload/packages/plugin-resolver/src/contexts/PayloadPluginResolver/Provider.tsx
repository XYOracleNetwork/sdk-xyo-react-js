import type { PayloadPluginResolver } from '@xyo-network/payload-plugin'
import type { ContextExProviderProps } from '@xyo-network/react-shared'
import React, { useMemo, useState } from 'react'

import { PayloadPluginResolverContext } from './Context.ts'

export type PayloadPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadPluginResolver
}>

export const PayloadPluginResolverProvider: React.FC<PayloadPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadPluginResolver>(resolverProp)

  const value = useMemo(() => ({
    provided: true, resolver, setResolver,
  }), [resolver, setResolver])

  return (
    <PayloadPluginResolverContext.Provider
      value={value}
    >
      {resolver
        ? children
        : required
          ? null
          : children}
    </PayloadPluginResolverContext.Provider>
  )
}
