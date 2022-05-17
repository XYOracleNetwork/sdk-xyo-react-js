import { GridProps, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/core'

import { PayloadTable, PayloadTableProps } from '../../../payload'
import { Property } from '../../../property'

export interface BlockPayloadsProps extends FlexBoxProps {
  payloads?: XyoPayload[]
  payloadTableProps?: PayloadTableProps
  gridContainerProps?: GridProps
}

export const BlockPayloads: React.FC<BlockPayloadsProps> = ({ payloads, payloadTableProps, gridContainerProps = { flexDirection: 'column', flexGrow: '1' }, ...props }) => {
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Payloads</Typography>
        <QuickTipButton title="Payloads">The hash and schema for each payload witnessed</QuickTipButton>
      </FlexRow>
      <Property value={!!payloads} gridContainerProps={gridContainerProps}>
        <PayloadTable payloads={payloads} {...payloadTableProps} />
      </Property>
    </FlexCol>
  )
}
