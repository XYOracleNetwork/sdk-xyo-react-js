import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'

export interface BlocksQuickTipButtonProps extends QuickTipButtonProps {
  address?: string
}

export const BlocksQuickTipButton: React.FC<BlocksQuickTipButtonProps> = ({ address, ...props }) => (
  <QuickTipButton {...props}>Blockchain history for the current address: {address}</QuickTipButton>
)

export interface SelectedBlockQuickTipButtonProps extends QuickTipButtonProps {
  boundwitnessHash?: string
}

export const SelectedBlockQuickTipButton: React.FC<SelectedBlockQuickTipButtonProps> = ({ boundwitnessHash, ...props }) => (
  <QuickTipButton {...props}>
    Browse the history for the selected block: {boundwitnessHash}. Click on hashes in the Bound Witness tab to load related blocks.
  </QuickTipButton>
)
