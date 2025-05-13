import type { ContextExProviderProps } from '@xylabs/react-shared'
import type { PayloadPluginResolver } from '@xyo-network/payload-plugin'
import React, { useMemo, useState } from 'react'

import { PayloadPluginResolverContext } from './Context.ts'
import type { PayloadPluginResolverState } from './State.ts'

export type PayloadPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadPluginResolver
}>

export const PayloadPluginResolverProvider: React.FC<PayloadPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadPluginResolver>(resolverProp)

  const value: PayloadPluginResolverState = useMemo(() => ({
    provided: true, resolver, setResolver,
  }), [resolver, setResolver])

  return (
    <PayloadPluginResolverContext
      value={value}
    >
      {resolver
        ? children
        : required
          ? null
          : children}
    </PayloadPluginResolverContext>
  )
}
