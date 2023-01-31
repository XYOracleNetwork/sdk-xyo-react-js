import { useEffect, useState } from 'react'

import { BoundWitnessPayloadTableBody, BoundWitnessPayloadTableBodyProps } from './TableBody'

export interface BoundWitnessFilteredPayloadTableBodyProps extends BoundWitnessPayloadTableBodyProps {
  bwFilterType?: 'equal' | 'notEqual'
  schemaFilter?: string
}

export const BoundWitnessFilteredPayloadTableBody: React.FC<BoundWitnessFilteredPayloadTableBodyProps> = ({
  bwFilterType = 'equal',
  eventNoun = 'payload',
  payloadHashes = [],
  payloadSchemas = [],
  schemaFilter,
  ...props
}) => {
  const [bwPayloadHashes, setBWPayloadHashes] = useState<string[]>([])
  const [bwPayloadSchemas, setBWPayloadSchemas] = useState<string[]>([])

  useEffect(() => {
    // if no filter, display all hashes and schemas
    if (!schemaFilter) {
      setBWPayloadHashes(payloadHashes)
      setBWPayloadSchemas(payloadSchemas)
    }
  }, [payloadHashes, payloadSchemas, schemaFilter])

  useEffect(() => {
    if (payloadHashes && payloadSchemas && schemaFilter) {
      setBWPayloadSchemas(
        payloadSchemas.filter((schema) => {
          return bwFilterType === 'equal' ? schema === schemaFilter : schema !== schemaFilter
        }),
      )
      setBWPayloadHashes(() => {
        return payloadSchemas.reduce((acc, schema, index) => {
          if (bwFilterType === 'equal' ? schema === schemaFilter : schema !== schemaFilter) {
            acc[index] = payloadHashes[index]
          }
          return acc
        }, [] as string[])
      })
    }
  }, [bwFilterType, payloadHashes, payloadSchemas, schemaFilter])
  return <BoundWitnessPayloadTableBody payloadHashes={bwPayloadHashes} payloadSchemas={bwPayloadSchemas} eventNoun={eventNoun} {...props} />
}
