import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'

export interface PayloadDataDetailsProps extends FlexBoxProps {
  value?: XyoPayload
}

export const PayloadDataDetails: React.FC<PayloadDataDetailsProps> = ({ value, ...props }) => {
  const wrapper = value ? new XyoPayloadWrapper(value) : undefined
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Data</Typography>
        <QuickTipButton title="Payload Data">
          The protocol fields for the block. All these fields are used to generate the hash.
        </QuickTipButton>
      </FlexRow>
      <Property title="Hash" value={wrapper?.sortedHash() ?? '<Unknown>'} tip="This is the payload hash" />
    </FlexCol>
  )
}
