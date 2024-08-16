import type { Payload } from '@xyo-network/payload-model'
import type { PayloadTableProps } from '@xyo-network/react-payload-table'
import { PayloadTable } from '@xyo-network/react-payload-table'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type BlockPayloadsProps = PropertyGroupProps & {
  payloadTableProps?: PayloadTableProps
  payloads?: Payload[]
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
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
