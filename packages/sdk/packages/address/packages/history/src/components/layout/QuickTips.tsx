import { styled, Typography } from '@mui/material'
import type { QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import React from 'react'

export interface BlocksQuickTipButtonProps extends QuickTipButtonProps {
  address?: string
}

export const BlocksQuickTipButton: React.FC<BlocksQuickTipButtonProps> = ({ address, ...props }) => (
  <StyledQuickTipButton superScriptIcon {...props}>
    <Typography>
      Blockchain history for the current address:
      {' '}
      <span style={{ fontFamily: 'monospace' }}>{address}</span>
    </Typography>
  </StyledQuickTipButton>
)

export interface SelectedBlockQuickTipButtonProps extends QuickTipButtonProps {
  boundwitnessHash?: string
}

export const SelectedBlockQuickTipButton: React.FC<SelectedBlockQuickTipButtonProps> = ({ boundwitnessHash, ...props }) => (
  <StyledQuickTipButton superScriptIcon {...props}>
    <Typography>
      Browse the history for the selected block:
      {' '}
      <span style={{ fontFamily: 'monospace' }}>{boundwitnessHash}</span>
      . Click on hashes in the Bound
      Witness tab to load related blocks.
    </Typography>
  </StyledQuickTipButton>
)

export interface StyledQuickTipButtonProps extends QuickTipButtonProps {
  superScriptIcon?: boolean
}

const StyledQuickTipButton = styled(QuickTipButton, {
  name: 'StyledQuickTipButton',
  shouldForwardProp: propName => propName !== 'superScriptIcon',
})<StyledQuickTipButtonProps>(({ superScriptIcon, theme }) => ({
  // less than ideal but tough to get a negative value from a theme value that returns in px
  ...(superScriptIcon && { top: -Math.abs(Number.parseInt(theme.spacing(0.75).replace('px', ''))) }),
}))
