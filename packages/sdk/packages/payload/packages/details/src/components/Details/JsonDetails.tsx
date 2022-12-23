import { Paper, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload-model'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'
import { lazy, Suspense } from 'react'
import { ReactJsonViewProps } from 'react-json-view'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export type PayloadJsonDetailsProps = PropertyGroupProps & {
  payload?: XyoPayload
  jsonViewProps?: ReactJsonViewProps
}

export const PayloadJsonDetails: React.FC<PayloadJsonDetailsProps> = ({ jsonViewProps, payload = {}, ...props }) => {
  const { breakpoints, palette } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const jsonTheme = palette.mode === 'dark' ? 'shapeshifter' : undefined

  return (
    <PropertyGroup titleProps={{ elevation }} title="JSON" tip="The raw JSON of the payload" {...props}>
      <Paper square variant="elevation" style={{ overflow: 'hidden', padding: '16px', width: '100%' }}>
        <Suspense fallback={<FlexGrowRow />}>
          <JsonView
            groupArraysAfterLength={20}
            style={{ backgroundColor: undefined, overflow: 'hidden' }}
            src={payload}
            enableClipboard
            theme={jsonTheme}
            collapseStringsAfterLength={belowSm ? 24 : 32}
            {...jsonViewProps}
          />
        </Suspense>
      </Paper>
    </PropertyGroup>
  )
}
