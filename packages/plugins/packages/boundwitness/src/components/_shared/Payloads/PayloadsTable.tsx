import { WithChildren } from '@xylabs/react-shared'
import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { PayloadTableProps } from '@xyo-network/react-payload-table'
import { TableEx } from '@xyo-network/react-table'

import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: XyoBoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <BoundWitnessPayloadsTableInner {...props}>
    <BoundWitnessFilteredPayloadTableBody
      eventNoun="payload"
      schemaFilter={XyoBoundWitnessSchema}
      bwFilterType="notEqual"
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
      boundwitnessHash={boundwitness ? new PayloadWrapper(boundwitness).hash : ''}
    />
  </BoundWitnessPayloadsTableInner>
)

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <BoundWitnessPayloadsTableInner {...props}>
    <BoundWitnessFilteredPayloadTableBody
      eventNoun="boundwitness"
      schemaFilter={XyoBoundWitnessSchema}
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
      boundwitnessHash={boundwitness ? new PayloadWrapper(boundwitness).hash : ''}
    />
  </BoundWitnessPayloadsTableInner>
)

export const BoundWitnessPayloadsTableInner: React.FC<WithChildren<BoundWitnessPayloadTableProps>> = ({ children, ...props }) => (
  <TableEx {...props}>
    <BoundWitnessPayloadTableHead />
    {children}
  </TableEx>
)
