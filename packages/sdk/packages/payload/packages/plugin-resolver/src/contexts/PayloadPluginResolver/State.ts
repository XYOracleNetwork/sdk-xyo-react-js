import { XyoPayloadPluginResolver } from '@xyo-network/payload-plugin'
import { Dispatch } from 'react'

export interface PayloadPluginResolverState {
  resolver?: XyoPayloadPluginResolver
  setResolver?: Dispatch<XyoPayloadPluginResolver>
}
