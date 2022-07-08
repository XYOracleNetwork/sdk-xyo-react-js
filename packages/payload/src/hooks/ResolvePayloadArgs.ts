import { XyoApiError } from '@xyo-network/api'
import { XyoPayload } from '@xyo-network/payload'

export type UsePayloadArgs = [XyoPayload?, boolean?, XyoApiError?]

export type UseHuriOrHashArgs = [...UsePayloadArgs, boolean?]
