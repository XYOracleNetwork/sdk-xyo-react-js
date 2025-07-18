import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type { ExtendEventNoun } from '@xyo-network/react-event'
import type { PayloadTableProps } from '@xyo-network/react-payload-table'
import { TableEx } from '@xyo-network/react-table'
import type { PropsWithChildren } from 'react'
import React from 'react'

import type { ClickableFields } from './payloads-table/index.ts'
import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table/index.ts'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: BoundWitness
  clickableFields?: ClickableFields[]
  eventNoun?: ExtendEventNoun
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({
  boundwitness, clickableFields, eventNoun = 'payload', ...props
}) => {
  return (
    <BoundWitnessPayloadsTableInner {...props}>
      <BoundWitnessFilteredPayloadTableBody
        clickableFields={clickableFields}
        eventNoun={eventNoun}
        schemaFilter={BoundWitnessSchema}
        bwFilterType="notEqual"
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    </BoundWitnessPayloadsTableInner>
  )
}

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({
  boundwitness, clickableFields, eventNoun = 'boundwitness', ...props
}) => {
  return (
    <BoundWitnessPayloadsTableInner {...props}>
      <BoundWitnessFilteredPayloadTableBody
        clickableFields={clickableFields}
        eventNoun={eventNoun}
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
