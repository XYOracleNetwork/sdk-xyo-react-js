import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { PayloadTable, PayloadTableProps } from '../../Payload'
import { Property } from '../../Properties'

export interface BlockPayloadsProps extends FlexBoxProps {
  payloads?: XyoPayload[]
  payloadTableProps?: PayloadTableProps
  gridContainerFlexProps?: FlexBoxProps
}

export const BlockPayloads: React.FC<BlockPayloadsProps> = ({
  payloads,
  payloadTableProps,
  gridContainerFlexProps = { flexDirection: 'column', flexGrow: '1' },
  ...props
}) => {
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Payloads</Typography>
        <QuickTipButton title="Payloads">The hash and schema for each payload witnessed</QuickTipButton>
      </FlexRow>
      <Property value={!!payloads} gridContainerFlexProps={gridContainerFlexProps}>
        <PayloadTable payloads={payloads} {...payloadTableProps} />
      </Property>
    </FlexCol>
  )
}
