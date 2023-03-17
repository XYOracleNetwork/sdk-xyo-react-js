import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver'
import { PayloadRenderPluginResolverContext } from './Context'

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
      {resolver ? children : required ? null : children}
    </PayloadRenderPluginResolverContext.Provider>
  )
}
