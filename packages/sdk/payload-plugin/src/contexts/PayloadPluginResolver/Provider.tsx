import { XyoPayloadPluginResolver } from '@xyo-network/payload-plugin'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { PayloadPluginResolverContext } from './Context'

export type PayloadPluginResolverProviderProps = ContextExProviderProps<{
  resolver: XyoPayloadPluginResolver
}>

export const PayloadPluginResolverProvider: React.FC<PayloadPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<XyoPayloadPluginResolver>(resolverProp)

  return (
    <PayloadPluginResolverContext.Provider
      value={{
        provided: true,
        resolver,
        setResolver,
      }}
    >
      {resolver ? children : required ? null : children}
    </PayloadPluginResolverContext.Provider>
  )
}
