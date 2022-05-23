import { Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowRow, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness } from '@xyo-network/core'
import { lazy, Suspense } from 'react'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface BlockJsonDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
}

export const BlockJsonDetails: React.FC<BlockJsonDetailsProps> = ({ block = {}, ...props }) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>JSON</Typography>
        <QuickTipButton title="BoundWitness JSON">The raw JSON of the Bound Witness</QuickTipButton>
      </FlexRow>
      <Paper variant="outlined">
        <Suspense fallback={<FlexGrowRow />}>
          <JsonView src={block} collapseStringsAfterLength={belowSm ? 24 : 32} />
        </Suspense>
      </Paper>
    </FlexCol>
  )
}
