import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload-table'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

import { BoundWitnessPayloadTableBody, BoundWitnessPayloadTableHead } from './payloads-table'

export type BoundWitnessPayloadsProps = PropertyGroupProps & {
  payload?: XyoBoundWitness
  payloadTableProps?: PayloadTableProps
}

export const BoundWitnessPayloads: React.FC<BoundWitnessPayloadsProps> = ({ payload: boundwitness, payloadTableProps, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Payloads" tip="The hash and schema for each payload witnessed" {...props}>
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
        {...payloadTableProps}
      />
    </PropertyGroup>
  )
}
