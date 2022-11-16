import { WithChildren } from '@xylabs/react-shared'
import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { PayloadTableProps } from '@xyo-network/react-payload-table'
import { TableEx } from '@xyo-network/react-table'

import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: XyoBoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <BoundWitnessPayloadsTableInner {...props}>
    <BoundWitnessFilteredPayloadTableBody
      schemaFilter={XyoBoundWitnessSchema}
      filterType="notEqual"
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
    />
  </BoundWitnessPayloadsTableInner>
)

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <BoundWitnessPayloadsTableInner {...props}>
    <BoundWitnessFilteredPayloadTableBody
      schemaFilter={XyoBoundWitnessSchema}
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
    />
  </BoundWitnessPayloadsTableInner>
)

export const BoundWitnessPayloadsTableInner: React.FC<WithChildren<BoundWitnessPayloadTableProps>> = ({ children, ...props }) => (
  <TableEx {...props}>
    <BoundWitnessPayloadTableHead />
    {children}
  </TableEx>
)
