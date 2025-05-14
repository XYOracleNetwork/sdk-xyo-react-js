import {
  Paper, useMediaQuery, useTheme,
} from '@mui/material'
import type { Payload } from '@xyo-network/payload-model'
import type { JsonViewerExProps } from '@xyo-network/react-payload-raw-info'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import type { PropertyGroupProps } from '@xyo-network/react-property'
import { PropertyGroup } from '@xyo-network/react-property'
import React from 'react'

export type PayloadJsonDetailsProps = PropertyGroupProps & {
  jsonViewProps?: JsonViewerExProps
  payload?: Payload
}

export const PayloadJsonDetails: React.FC<PayloadJsonDetailsProps> = ({
  jsonViewProps, payload, ...props
}) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="JSON" tip="The raw JSON of the payload" {...props}>
      <Paper
        square
        variant="elevation"
        style={{
          overflow: 'hidden', padding: '16px', width: '100%',
        }}
      >
        <JsonViewerEx
          groupArraysAfterLength={20}
          style={{ overflow: 'hidden' }}
          value={payload}
          enableClipboard
          collapseStringsAfterLength={belowSm ? 24 : 32}
          {...jsonViewProps}
        />
      </Paper>
    </PropertyGroup>
  )
}
