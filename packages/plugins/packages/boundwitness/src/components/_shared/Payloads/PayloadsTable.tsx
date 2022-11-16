import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload-table'

import { BoundWitnessFilteredPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table'

export interface BoundWitnessPayloadTableProps extends PayloadTableProps {
  boundwitness?: XyoBoundWitness
}

export const BoundWitnessPayloadsTable: React.FC<BoundWitnessPayloadTableProps> = ({ boundwitness, ...props }) => (
  <PayloadTable
    PayloadTableHeadComponent={(props) => <BoundWitnessPayloadTableHead {...props} />}
    PayloadTableBodyComponent={(props) => (
      <BoundWitnessFilteredPayloadTableBody
        {...props}
        schemaFilter={XyoBoundWitnessSchema}
        filterType="notEqual"
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
      <BoundWitnessFilteredPayloadTableBody
        {...props}
        schemaFilter={XyoBoundWitnessSchema}
        noResults={boundwitness?.payload_hashes.length === 0}
        payloadHashes={boundwitness?.payload_hashes}
        payloadSchemas={boundwitness?.payload_schemas}
      />
    )}
    {...props}
  />
)
