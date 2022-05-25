import { useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/core'
import { PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'
import { lazy, Suspense } from 'react'
import { ReactJsonViewProps } from 'react-json-view'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export type PayloadJsonDetailsProps = PropertyGroupProps & {
  payload?: XyoPayload
  jsonViewProps?: ReactJsonViewProps
}

export const PayloadJsonDetails: React.FC<PayloadJsonDetailsProps> = ({ jsonViewProps, payload = {}, ...props }) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="JSON" tip="The raw JSON of the payload" {...props}>
      <Suspense fallback={<FlexGrowRow />}>
        <JsonView src={payload} enableClipboard collapseStringsAfterLength={belowSm ? 24 : 32} {...jsonViewProps} />
      </Suspense>
    </PropertyGroup>
  )
}
