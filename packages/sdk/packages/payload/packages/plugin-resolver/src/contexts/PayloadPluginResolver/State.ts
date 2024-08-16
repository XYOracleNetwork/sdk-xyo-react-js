import type { PayloadPluginResolver } from '@xyo-network/payload-plugin'
import type { Dispatch } from 'react'

export interface PayloadPluginResolverState {
  resolver?: PayloadPluginResolver
  setResolver?: Dispatch<PayloadPluginResolver>
}
