import { assertEx } from '@xylabs/assert'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { Payload } from '@xyo-network/payload-model'
import { isAnyPayload } from '@xyo-network/payload-model'
import { useMemo } from 'react'

import type { ValidatedResponse } from './types/index.ts'

export const usePayloadValidate = <TPayload extends Payload>(input?: string): ValidatedResponse => {
  return useMemo(() => {
    if (!input) return {}
    try {
      const object = JSON.parse(input)
      const validPayload = assertEx(isAnyPayload(object) ? object : null, () => 'Invalid payload')
      const { schema, ...fields } = validPayload
      return { payload: new PayloadBuilder({ schema }).fields(fields).build() as TPayload }
    } catch (error) {
      return { errors: [error as Error] }
    }
  }, [input])
}
