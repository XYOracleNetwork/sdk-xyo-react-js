import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { XyoPayloadRenderPluginResolver } from '../../XyoPayloadRenderPluginResolver'
import { PayloadRenderPluginResolverContext } from './Context'

export type PayloadRenderPluginResolverProviderProps = ContextExProviderProps<{
  resolver: XyoPayloadRenderPluginResolver
}>

export const PayloadRenderPluginResolverProvider: React.FC<PayloadRenderPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<XyoPayloadRenderPluginResolver>(resolverProp)

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
