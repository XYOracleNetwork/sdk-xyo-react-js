import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type { PayloadTableProps } from '@xyo-network/react-payload-table'
import { usePayloadHash } from '@xyo-network/react-shared'
import { TableEx } from '@xyo-network/react-table'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table/index.ts'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: BoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => {
  const hash = usePayloadHash(boundwitness)
  return (
    <BoundWitnessPayloadsTableInner {...props}>
      <BoundWitnessFilteredPayloadTableBody
        eventNoun="payload"
        schemaFilter={BoundWitnessSchema}
        bwFilterType="notEqual"
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    </BoundWitnessPayloadsTableInner>
  )
}

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => {
  return (
    <BoundWitnessPayloadsTableInner {...props}>
      <BoundWitnessFilteredPayloadTableBody
        eventNoun="boundwitness"
        schemaFilter={BoundWitnessSchema}
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    </BoundWitnessPayloadsTableInner>
  )
}

export const BoundWitnessPayloadsTableInner: React.FC<PropsWithChildren<BoundWitnessPayloadTableProps>> = ({ children, ...props }) => (
  <TableEx {...props}>
    <BoundWitnessPayloadTableHead />
    {children}
  </TableEx>
)
