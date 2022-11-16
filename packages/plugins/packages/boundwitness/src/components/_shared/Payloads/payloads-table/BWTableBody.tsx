import { useEffect, useState } from 'react'

import { BoundWitnessPayloadTableBodyProps } from './lib'
import { BoundWitnessPayloadTableBody } from './TableBody'

export const BoundWitnessFilteredPayloadTableBody: React.FC<BoundWitnessPayloadTableBodyProps> = ({
  payloadHashes,
  payloadSchemas,
  schemaFilter,
  filterType = 'equal',
  ...props
}) => {
  const [bwPayloadHashes, setBWPayloadHashes] = useState<string[]>([])
  const [bwPayloadSchemas, setBWPayloadSchemas] = useState<string[]>([])

  useEffect(() => {
    if (!schemaFilter && payloadHashes && payloadSchemas) {
      setBWPayloadHashes(payloadHashes)
      setBWPayloadSchemas(payloadSchemas)
    }
  }, [payloadHashes, payloadSchemas, schemaFilter])

  useEffect(() => {
    if (payloadHashes && payloadSchemas && schemaFilter) {
      setBWPayloadSchemas(
        payloadSchemas?.filter((schema, index) => {
          const filter = filterType === 'equal' ? schema === schemaFilter : schema !== schemaFilter
          if (filter) {
            setBWPayloadHashes((previous) => {
              return [...previous, payloadHashes[index]]
            })
            return true
          }
          return false
        }),
      )
    }
  }, [filterType, payloadHashes, payloadSchemas, schemaFilter])
  return <BoundWitnessPayloadTableBody payloadHashes={bwPayloadHashes} payloadSchemas={bwPayloadSchemas} eventNoun="boundwitness" {...props} />
}

// export second version that is only for payloads??
