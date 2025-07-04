import type { ContextExProviderProps } from '@xylabs/react-shared'
import React, { useMemo, useState } from 'react'

import type { PayloadRenderPluginResolver } from '../../PayloadRenderPluginResolver.ts'
import { PayloadRenderPluginResolverContext } from './Context.ts'
import type { PayloadRenderPluginResolverState } from './State.ts'

export type PayloadRenderPluginResolverProviderProps = ContextExProviderProps<{
  resolver: PayloadRenderPluginResolver
}>

export const PayloadRenderPluginResolverProvider: React.FC<PayloadRenderPluginResolverProviderProps> = ({
  resolver: resolverProp,
  required = false,
  children,
}) => {
  const [resolver, setResolver] = useState<PayloadRenderPluginResolver>(resolverProp)

  const value: PayloadRenderPluginResolverState = useMemo(() => ({
    resolver, provided: true, setResolver,
  }), [resolver, setResolver])

  return (
    <PayloadRenderPluginResolverContext
      value={value}
    >
      {resolver
        ? children
        : required
          ? null
          : children}
    </PayloadRenderPluginResolverContext>
  )
}
