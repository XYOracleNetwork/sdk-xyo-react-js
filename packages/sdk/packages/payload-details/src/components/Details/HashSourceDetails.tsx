import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'

export interface PayloadHashSourceDetailsProps extends FlexBoxProps {
  noTitle?: boolean
  payload?: XyoPayload
}

export const PayloadHashSourceDetails: React.FC<PayloadHashSourceDetailsProps> = ({ noTitle = false, payload, ...props }) => {
  const theme = useTheme()
  const payloadWrapper = payload ? new PayloadWrapper(payload) : null

  return (
    <FlexCol alignItems="stretch" {...props}>
      {noTitle ? null : (
        <FlexRow margin={1} justifyContent="flex-start">
          <Typography>Hash Source</Typography>
          <QuickTipButton title="Hash Source">The actual string used to generate the hash (SHA256)</QuickTipButton>
        </FlexRow>
      )}
      <FlexRow>
        <FlexGrowRow background border={1} borderColor={theme.palette.divider} justifyContent="start">
          <Typography padding={2} fontFamily="monospace" variant="body1" sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>
            {payloadWrapper?.stringified ?? ''}
          </Typography>
        </FlexGrowRow>
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
      </FlexRow>
      {noTitle ? (
        <FlexRow margin={1} justifyContent="flex-start">
          <Typography variant="body2">
            The actual string used to generate the hash (SHA256). This can be used to validate the hash manually.
          </Typography>
        </FlexRow>
      ) : null}
    </FlexCol>
  )
}
