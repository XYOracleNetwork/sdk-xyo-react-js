import type { ContextExState } from '@xylabs/react-shared'
import type { PayloadPluginResolver } from '@xyo-network/payload-plugin'
import type { Dispatch } from 'react'

export type PayloadPluginResolverState = ContextExState<{
  resolver?: PayloadPluginResolver
  setResolver?: Dispatch<PayloadPluginResolver>
}>
