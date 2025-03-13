import type { Payload } from '@xyo-network/payload-model'
import type { PayloadTableProps } from '@xyo-network/react-payload-table'
import { PayloadTable } from '@xyo-network/react-payload-table'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { PropertyGroup } from '@xyo-network/react-property'
import type { RefObject } from 'react'
import React from 'react'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export type BlockPayloadsProps = PropertyGroupProps & {
  payloadTableProps?: PayloadTableProps
  payloads?: Payload[]
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockPayloads: React.FC<BlockPayloadsProps> = ({
  payloads, payloadTableProps, ...props
}) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  const { ref: tableRef, ...remainingPayloadTableProps } = payloadTableProps ?? {}
  // less than ideal but seems to be required to satisfy @types/react v19 and mui's Table component
  // for some reason passing a ref requires a cast to React.Ref<HTMLTableElement> & RefObject<HTMLTableElement | null>
  // but inside the PayloadTable component, destructuring ref from props is Ref<HTMLTableElement> | undefined
  const castRef = tableRef as React.Ref<HTMLTableElement> & RefObject<HTMLTableElement | null> | undefined
  return (
    <PropertyGroup titleProps={{ elevation }} title="Payloads" tip="The hash and schema for each payload witnessed" {...props}>
      <PayloadTable
        payloads={payloads}
        ref={castRef}
        {...remainingPayloadTableProps}
      />
    </PropertyGroup>
  )
}
