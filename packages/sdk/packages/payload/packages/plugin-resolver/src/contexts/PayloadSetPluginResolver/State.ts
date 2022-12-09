import { PayloadSetPluginResolver } from '@xyo-network/payloadset-plugin'
import { Dispatch } from 'react'

export interface PayloadSetPluginResolverState {
  resolver?: PayloadSetPluginResolver
  setResolver?: Dispatch<PayloadSetPluginResolver>
}
