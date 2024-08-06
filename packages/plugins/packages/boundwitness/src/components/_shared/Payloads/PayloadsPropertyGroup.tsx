import { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadTableProps } from '@xyo-network/react-payload-table'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'
import React from 'react'

import { BoundWitnessPayloadsTable } from './PayloadsTable.js'

export type BoundWitnessPayloadsProps = PropertyGroupProps & {
  payload?: BoundWitness
  payloadTableProps?: PayloadTableProps
}

export const BoundWitnessPayloads: React.FC<BoundWitnessPayloadsProps> = ({ payload: boundwitness, payloadTableProps, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Payloads" tip="The hash and schema for each payload witnessed" {...props}>
      <BoundWitnessPayloadsTable boundwitness={boundwitness} {...payloadTableProps} />
    </PropertyGroup>
  )
}
