import React, { useMemo, useState } from 'react'

import type { BoundWitnessPayloadTableBodyProps } from './TableBody.tsx'
import { BoundWitnessPayloadTableBody } from './TableBody.tsx'

export interface BoundWitnessFilteredPayloadTableBodyProps extends BoundWitnessPayloadTableBodyProps {
  bwFilterType?: 'equal' | 'notEqual'
  schemaFilter?: string
}

export const BoundWitnessFilteredPayloadTableBody: React.FC<BoundWitnessFilteredPayloadTableBodyProps> = ({
  bwFilterType = 'equal',
  clickableFields,
  eventNoun,
  payloadHashes,
  payloadSchemas,
  schemaFilter,
  ...props
}) => {
  const [bwPayloadHashes, setBWPayloadHashes] = useState<string[]>()
  const [bwPayloadSchemas, setBWPayloadSchemas] = useState<string[]>()

  useMemo(() => {
    // if no filter, display all hashes and schemas
    if (!schemaFilter) {
      setBWPayloadHashes(payloadHashes)
      setBWPayloadSchemas(payloadSchemas)
    }
  }, [payloadHashes, payloadSchemas, schemaFilter])

  useMemo(() => {
    if (payloadSchemas && schemaFilter) {
      const filteredSchemas = payloadSchemas.filter((schema) => {
        return bwFilterType === 'equal' ? schema === schemaFilter : schema !== schemaFilter
      })
      setBWPayloadSchemas(filteredSchemas)
    }
  }, [bwFilterType, payloadSchemas, schemaFilter])

  useMemo(() => {
    if (payloadHashes && payloadSchemas && schemaFilter) {
      // eslint-disable-next-line unicorn/no-array-reduce
      const filteredHashes = payloadSchemas.reduce<string[]>((acc, schema, index) => {
        if (bwFilterType === 'equal' ? schema === schemaFilter : schema !== schemaFilter) {
          acc.push(payloadHashes[index])
        }
        return acc
      }, [])
      setBWPayloadHashes(filteredHashes)
    }
  }, [bwFilterType, payloadHashes, payloadSchemas, schemaFilter])
  return (
    <BoundWitnessPayloadTableBody
      payloadHashes={bwPayloadHashes}
      payloadSchemas={bwPayloadSchemas}
      clickableFields={clickableFields}
      eventNoun={eventNoun}
      {...props}
    />
  )
}
