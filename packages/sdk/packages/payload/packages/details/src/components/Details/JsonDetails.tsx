import { Paper, useMediaQuery, useTheme } from '@mui/material'
import { Payload } from '@xyo-network/payload-model'
import { JsonViewerEx, JsonViewerExProps } from '@xyo-network/react-payload-raw-info'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadJsonDetailsProps = PropertyGroupProps & {
  jsonViewProps?: JsonViewerExProps
  payload?: Payload
}

export const PayloadJsonDetails: React.FC<PayloadJsonDetailsProps> = ({ jsonViewProps, payload = {}, ...props }) => {
  const { breakpoints, palette } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const jsonTheme = palette.mode === 'dark' ? 'dark' : 'light'

  return (
    <PropertyGroup titleProps={{ elevation }} title="JSON" tip="The raw JSON of the payload" {...props}>
      <Paper square variant="elevation" style={{ overflow: 'hidden', padding: '16px', width: '100%' }}>
        <JsonViewerEx
          groupArraysAfterLength={20}
          style={{ backgroundColor: undefined, overflow: 'hidden' }}
          value={payload}
          enableClipboard
          theme={jsonTheme}
          collapseStringsAfterLength={belowSm ? 24 : 32}
          {...jsonViewProps}
        />
      </Paper>
    </PropertyGroup>
  )
}
