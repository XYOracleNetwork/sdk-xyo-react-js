import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface PayloadHashSourceDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
}

export const PayloadHashSourceDetails: React.FC<PayloadHashSourceDetailsProps> = ({ payload, ...props }) => {
  const payloadWrapper = payload ? new XyoPayloadWrapper(payload) : null

  return (
    <FlexCol alignItems="stretch" {...props}>
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
  )
}
