import { XyoError } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload-model'

export type UsePayload = [XyoPayload?, boolean?, XyoError?]

export type UseHuriOrHash = [...UsePayload, boolean?]
