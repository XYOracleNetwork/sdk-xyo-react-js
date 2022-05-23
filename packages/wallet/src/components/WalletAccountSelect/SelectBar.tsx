import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'

import { WalletAccountSelect } from './Select'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  size?: 'small' | 'medium'
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({ size = 'small', ...props }) => {
  return (
    <FlexRow paper alignItems="stretch" {...props}>
      <WalletAccountSelect size={size} fullWidth />
    </FlexRow>
  )
}
