import { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { PayloadSetPluginResolverContext } from './Context'

export type PayloadSetPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadSetPluginResolver
}>

export const PayloadSetPluginResolverProvider: React.FC<PayloadSetPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadSetPluginResolver>(resolverProp)

  return (
    <PayloadSetPluginResolverContext.Provider
      value={{
        provided: true,
        resolver,
        setResolver,
      }}
    >
      {resolver ? children : required ? null : children}
    </PayloadSetPluginResolverContext.Provider>
  )
}
