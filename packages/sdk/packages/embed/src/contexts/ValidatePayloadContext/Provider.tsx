import { Chip } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { SchemaCache, SchemaNameToValidatorMap } from '@xyo-network/schema-cache'
import { useState } from 'react'

import { useResolvePayload } from '../ResolvePayloadContext/index.js'
import { ValidatePayloadContext } from './Context.js'

export interface ValidatePayloadProviderProps {
  // Opt-in flag to validate payloads for the plugin(s)
  enabled?: boolean
}

export const ValidatePayloadProvider: React.FC<WithChildren<ValidatePayloadProviderProps>> = ({ children, enabled = false }) => {
  const { payload } = useResolvePayload()
  const [initialized, setInitialized] = useState(false)
  const [valid, setValid] = useState<boolean>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (payload && enabled) {
        await SchemaCache.instance.get(payload.schema)

        const possibleKnownSchema = payload.schema as keyof SchemaNameToValidatorMap

        if (SchemaCache.instance.validators[possibleKnownSchema]) {
          const validator = SchemaCache.instance.validators[possibleKnownSchema]
          setValid(validator?.(payload))
        }
        setInitialized(true)
      }
    },
    [payload, enabled],
  )

  return (
    <ValidatePayloadContext.Provider value={{ enabled, provided: true, schema: payload?.schema, validPayload: valid }}>
      {enabled
        ? <>{initialized ? children : <Chip label="Validating Payload..." />}</>
        : children}
    </ValidatePayloadContext.Provider>
  )
}
