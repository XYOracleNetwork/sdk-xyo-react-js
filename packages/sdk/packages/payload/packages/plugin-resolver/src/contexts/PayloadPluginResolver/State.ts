import { PayloadPluginResolver } from '@xyo-network/payload-plugin'
import { Dispatch } from 'react'

export interface PayloadPluginResolverState {
  resolver?: PayloadPluginResolver
  setResolver?: Dispatch<PayloadPluginResolver>
}
