import { useResetState } from '@xylabs/react-hooks'
import type { ContextExProviderProps } from '@xylabs/react-shared'
import type { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import React from 'react'

import { PayloadSetPluginResolverContext } from './Context.ts'

export type PayloadSetPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadSetPluginResolver
}>

export const PayloadSetPluginResolverProvider: React.FC<PayloadSetPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useResetState<PayloadSetPluginResolver>(resolverProp)

  return (
    <PayloadSetPluginResolverContext
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
    </PayloadSetPluginResolverContext>
  )
}
