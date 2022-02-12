import { KeyboardArrowDown } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexGrowRow, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { lazy, Suspense } from 'react'

import { Property } from '../../Properties'
import { PayloadDataDetails } from './DataDetails'
import { PayloadMetaDetails } from './MetaDetails'
import { PayloadValidationDetails } from './ValidationDetails'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface PayloadDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
}

export const PayloadDetails: React.FC<PayloadDetailsProps> = ({ payload, ...props }) => {
  const payloadWrapper = payload ? new XyoPayloadWrapper(payload) : null

  return (
    <FlexGrowCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <PayloadDataDetails value={payload} />
      <PayloadMetaDetails value={payload} />
      <PayloadValidationDetails value={payload} />
      {payload ? (
        <FlexCol margin={1} alignItems="stretch">
          <FlexRow margin={1} justifyContent="flex-start">
            <Typography>JSON</Typography>
            <QuickTipButton title="Payload JSON">The raw JSON of the payload</QuickTipButton>
          </FlexRow>
          <Property paddingY={2} value={!!payload}>
            <Suspense fallback={<FlexGrowRow />}>
              <JsonView src={payload} collapseStringsAfterLength={32} />
            </Suspense>
          </Property>
        </FlexCol>
      ) : null}
      {payload ? (
        <FlexCol margin={1} alignItems="stretch">
          <FlexRow margin={1} justifyContent="flex-start">
            <Typography>Hash Source</Typography>
            <QuickTipButton title="Hash Source">The actual string used to generate the hash (SHA256)</QuickTipButton>
          </FlexRow>
          <Property paddingY={2} value={!!payload}>
            <FlexRow flexWrap="wrap" width="500px">
              <Typography
                fontFamily="monospace"
                variant="body1"
                flexWrap="wrap"
                width="500px"
                style={{ wordWrap: 'break-word' }}
              >
                {payloadWrapper?.sortedStringify() ?? ''}
              </Typography>
            </FlexRow>
          </Property>
        </FlexCol>
      ) : null}
    </FlexGrowCol>
  )
}
