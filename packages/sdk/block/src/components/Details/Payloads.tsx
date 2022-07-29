import { XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type BlockPayloadsProps = PropertyGroupProps & {
  payloads?: XyoPayloadWithPartialMeta[]
  payloadTableProps?: PayloadTableProps
}

export const BlockPayloads: React.FC<BlockPayloadsProps> = ({ payloads, payloadTableProps, ...props }) => {
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
