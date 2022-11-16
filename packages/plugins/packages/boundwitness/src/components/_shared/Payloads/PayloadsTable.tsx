import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { PayloadTableProps } from '@xyo-network/react-payload-table'
import { TableEx } from '@xyo-network/react-table'

import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: XyoBoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <TableEx variant="scrollable" {...props}>
    <BoundWitnessPayloadTableHead />
    <BoundWitnessFilteredPayloadTableBody
      schemaFilter={XyoBoundWitnessSchema}
      filterType="notEqual"
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
    />
  </TableEx>
)

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <TableEx variant="scrollable" {...props}>
    <BoundWitnessPayloadTableHead />
    <BoundWitnessFilteredPayloadTableBody
      schemaFilter={XyoBoundWitnessSchema}
      noResults={boundwitness?.payload_hashes.length === 0}
      payloadHashes={boundwitness?.payload_hashes}
      payloadSchemas={boundwitness?.payload_schemas}
    />
  </TableEx>
)
