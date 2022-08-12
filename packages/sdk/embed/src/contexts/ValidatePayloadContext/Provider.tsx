import { Chip } from '@mui/material'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { XyoSchemaCache, XyoSchemaNameToValidatorMap } from '@xyo-network/utils'
import { useState } from 'react'

import { useXyoEmbedPluginState } from '../XyoEmbedPluginContext'
import { ValidatePayloadContext } from './Context'

export interface ValidatePayloadProviderProps {
  // Opt-in flag to validate payloads for the plugin(s)
  enabled?: boolean
}

export const ValidatePayloadProvider: React.FC<WithChildren<ValidatePayloadProviderProps>> = ({ children, enabled = false }) => {
  const { payload } = useXyoEmbedPluginState()
  const [initialized, setInitialized] = useState(false)
  const [valid, setValid] = useState<boolean>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (payload && enabled) {
        await XyoSchemaCache.instance.get(payload.schema)

        const possibleKnownSchema = payload.schema as keyof XyoSchemaNameToValidatorMap

        if (XyoSchemaCache.instance.validators[possibleKnownSchema]) {
          const validator = XyoSchemaCache.instance.validators[possibleKnownSchema]
          setValid(validator?.(payload))
        }
        setInitialized(true)
      }
    },
    [payload, enabled],
  )

  return (
    <ValidatePayloadContext.Provider value={{ enabled, provided: true, schema: payload?.schema, validPayload: valid }}>
      {enabled ? <>{initialized ? children : <Chip label="Validating Payload..." />}</> : children}
    </ValidatePayloadContext.Provider>
  )
}
