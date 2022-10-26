import { XyoPayload } from '@xyo-network/payload'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload-table'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type BoundWitnessPayloadsProps = PropertyGroupProps & {
  payloads?: XyoPayload[]
  payloadTableProps?: PayloadTableProps
}

export const BoundWitnessPayloads: React.FC<BoundWitnessPayloadsProps> = ({ payloads, payloadTableProps, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Payloads" tip="The hash and schema for each payload witnessed" {...props}>
      <PayloadTable payloads={payloads} {...payloadTableProps} />
    </PropertyGroup>
  )
}
