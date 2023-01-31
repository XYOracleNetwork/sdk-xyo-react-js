import { Paper } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { WalletAccountSelect } from './Select'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  size?: 'small' | 'medium'
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({ iconOnly, iconSize, icons, size = 'small', ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Paper variant="elevation" elevation={0}>
        <WalletAccountSelect fullWidth iconSize={iconSize} iconOnly={iconOnly} icons={icons} size={size ?? 'small'} />
      </Paper>
    </FlexCol>
  )
}
