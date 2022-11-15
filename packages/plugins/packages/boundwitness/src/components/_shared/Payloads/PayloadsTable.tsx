import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload-table'

import { BoundWitnessPayloadTableBody, BoundWitnessPayloadTableBodyForBWs, BoundWitnessPayloadTableHead } from './payloads-table'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: XyoBoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <PayloadTable
    PayloadTableHeadComponent={(props) => <BoundWitnessPayloadTableHead {...props} />}
    PayloadTableBodyComponent={(props) => (
      <BoundWitnessPayloadTableBody
        {...props}
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    )}
    {...props}
  />
)

export const BoundWitnessPayloadsTableForBWs: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <PayloadTable
    PayloadTableHeadComponent={(props) => <BoundWitnessPayloadTableHead {...props} />}
    PayloadTableBodyComponent={(props) => (
      <BoundWitnessPayloadTableBodyForBWs
        {...props}
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    )}
    {...props}
  />
)
