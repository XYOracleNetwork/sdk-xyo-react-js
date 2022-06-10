import { Paper } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { WalletAccountSelect } from './Select'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  size?: 'small' | 'medium'
  iconOnly?: boolean
  icons?: boolean
  iconSize?: number
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({ iconOnly, icons, iconSize, size = 'small', ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Paper variant="elevation" elevation={0}>
        <WalletAccountSelect fullWidth iconSize={iconSize} iconOnly={iconOnly} icons={icons} size={size ?? 'small'} />
      </Paper>
    </FlexCol>
  )
}
