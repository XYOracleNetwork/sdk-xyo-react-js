import { FlexBoxProps, FlexRow } from '@xylabs/sdk-react'

import { WalletAccountSelect } from './Select'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  size?: 'small' | 'medium'
  iconOnly?: boolean
  icons?: boolean
  iconSize?: number
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({ iconOnly, icons, iconSize, size = 'small', ...props }) => {
  return (
    <FlexRow paper alignItems="stretch" {...props}>
      <WalletAccountSelect iconOnly={iconOnly} icons={icons} iconSize={iconSize} size={size} fullWidth />
    </FlexRow>
  )
}
