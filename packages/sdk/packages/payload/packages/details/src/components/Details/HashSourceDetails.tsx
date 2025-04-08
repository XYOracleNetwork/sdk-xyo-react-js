import { ContentCopy as ContentCopyIcon } from '@mui/icons-material'
import {
  IconButton, Typography, useTheme,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import {
  FlexCol, FlexGrowRow, FlexRow,
} from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { Payload } from '@xyo-network/payload-model'
import React from 'react'

export interface PayloadHashSourceDetailsProps extends FlexBoxProps {
  noTitle?: boolean
  payload?: Payload
}

export const PayloadHashSourceDetails: React.FC<PayloadHashSourceDetailsProps> = ({
  noTitle = false, payload, ...props
}) => {
  const theme = useTheme()
  const payloadString = payload ? JSON.stringify(PayloadBuilder.hashableFields(payload), null, 2) : ''

  return (
    <FlexCol alignItems="stretch" {...props}>
      {noTitle
        ? null
        : (
            <FlexRow margin={1} justifyContent="flex-start">
              <Typography>Hash Source</Typography>
              <QuickTipButton title="Hash Source">The actual string used to generate the hash (SHA256)</QuickTipButton>
            </FlexRow>
          )}
      <FlexRow>
        <FlexGrowRow background border={1} borderColor={theme.palette.divider} justifyContent="start">
          <Typography
            padding={2}
            fontFamily="monospace"
            variant="body1"
            sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}
          >
            {payloadString}
          </Typography>
        </FlexGrowRow>
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
      </FlexRow>
      {noTitle
        ? (
            <FlexRow margin={1} justifyContent="flex-start">
              <Typography variant="body2">
                The actual string used to generate the hash (SHA256). This can be used to validate the hash manually.
              </Typography>
            </FlexRow>
          )
        : null}
    </FlexCol>
  )
}
