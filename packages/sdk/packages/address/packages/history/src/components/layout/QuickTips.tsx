import { styled } from '@mui/material'
import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'

export interface BlocksQuickTipButtonProps extends QuickTipButtonProps {
  address?: string
}

export const BlocksQuickTipButton: React.FC<BlocksQuickTipButtonProps> = ({ address, ...props }) => (
  <StyledQuickTipButton superScriptIcon {...props}>
    Blockchain history for the current address: {address}
  </StyledQuickTipButton>
)

export interface SelectedBlockQuickTipButtonProps extends QuickTipButtonProps {
  boundwitnessHash?: string
}

export const SelectedBlockQuickTipButton: React.FC<SelectedBlockQuickTipButtonProps> = ({ boundwitnessHash, ...props }) => (
  <StyledQuickTipButton superScriptIcon {...props}>
    Browse the history for the selected block: {boundwitnessHash}. Click on hashes in the Bound Witness tab to load related blocks.
  </StyledQuickTipButton>
)

export interface StyledQuickTipButtonProps extends QuickTipButtonProps {
  superScriptIcon?: boolean
}

const StyledQuickTipButton = styled(QuickTipButton, {
  name: 'StyledQuickTipButton',
  shouldForwardProp: (propName) => propName !== 'superScriptIcon',
})<StyledQuickTipButtonProps>(({ superScriptIcon, theme }) => ({
  // less than ideal but tough to get a negative value from a theme value that returns in px
  ...(superScriptIcon && { top: -Math.abs(parseInt(theme.spacing(0.75).replace('px', ''))) }),
}))
