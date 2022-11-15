import { XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { useEffect, useState } from 'react'

import { BoundWitnessPayloadTableBodyProps } from './lib'
import { BoundWitnessPayloadTableBody } from './TableBody'

export const BoundWitnessPayloadTableBodyForBWs: React.FC<BoundWitnessPayloadTableBodyProps> = ({ payloadHashes, payloadSchemas, ...props }) => {
  const [bwPayloadHashes, setBWPayloadHashes] = useState<string[]>([])
  const [bwPayloadSchemas, setBWPayloadSchemas] = useState<string[]>([])

  useEffect(() => {
    if (payloadHashes && payloadSchemas) {
      setBWPayloadSchemas(
        payloadSchemas?.filter((schema, index) => {
          if (schema === XyoBoundWitnessSchema) {
            if (payloadHashes) {
              setBWPayloadHashes((previous) => {
                return [...previous, payloadHashes[index]]
              })
            }
            return true
          }
          return false
        }),
      )
    }
  }, [payloadHashes, payloadSchemas])
  return <BoundWitnessPayloadTableBody payloadHashes={bwPayloadHashes} payloadSchemas={bwPayloadSchemas} eventNoun="boundwitness" {...props} />
}
