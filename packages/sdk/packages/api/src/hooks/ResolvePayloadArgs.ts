import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'

export type UsePayload = [XyoPayload?, boolean?, XyoApiError?]

export type UseHuriOrHash = [...UsePayload, boolean?]
