import type { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import type { Dispatch } from 'react'

export interface PayloadSetPluginResolverState {
  resolver?: PayloadSetPluginResolver
  setResolver?: Dispatch<PayloadSetPluginResolver>
}
