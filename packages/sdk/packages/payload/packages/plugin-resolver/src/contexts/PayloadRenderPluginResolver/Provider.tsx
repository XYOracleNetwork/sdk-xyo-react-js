import { ContextExProviderProps } from '@xyo-network/react-shared'
import React, { useState } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.ts'
import { PayloadRenderPluginResolverContext } from './Context.ts'

export type PayloadRenderPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadRenderPluginResolver
}>

export const PayloadRenderPluginResolverProvider: React.FC<PayloadRenderPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadRenderPluginResolver>(resolverProp)

  return (
    <PayloadRenderPluginResolverContext.Provider
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
    </PayloadRenderPluginResolverContext.Provider>
  )
}
