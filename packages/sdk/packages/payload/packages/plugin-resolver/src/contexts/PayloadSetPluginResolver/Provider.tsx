import { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import React, { useEffect, useState } from 'react'

import { PayloadSetPluginResolverContext } from './Context.ts'

export type PayloadSetPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadSetPluginResolver
}>

export const PayloadSetPluginResolverProvider: React.FC<PayloadSetPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadSetPluginResolver>(resolverProp)

  useEffect(() => {
    setResolver(resolverProp)
  }, [resolverProp])

  return (
    <PayloadSetPluginResolverContext.Provider
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
      value={{
        provided: true,
        resolver,
        setResolver,
      }}
    >
      {resolver
        ? children
        : required
          ? null
          : children}
    </PayloadSetPluginResolverContext.Provider>
  )
}
