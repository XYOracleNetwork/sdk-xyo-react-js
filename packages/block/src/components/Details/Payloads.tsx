import { XyoPayload } from '@xyo-network/core'
import { PayloadTable, PayloadTableProps } from '@xyo-network/react-payload'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export interface BlockPayloadsProps extends PropertyGroupProps {
  payloads?: XyoPayload[]
  payloadTableProps?: PayloadTableProps
}

export const BlockPayloads: React.FC<BlockPayloadsProps> = ({ payloads, payloadTableProps, ...props }) => {
  return (
    <PropertyGroup title="Payloads" tip="The hash and schema for each payload witnessed" {...props}>
      <PayloadTable payloads={payloads} {...payloadTableProps} />
    </PropertyGroup>
  )
}
