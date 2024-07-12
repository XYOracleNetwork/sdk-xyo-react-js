import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { WalletAccountSelect } from './Select.js'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  addressNames?: Record<string, string | undefined>
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  maxAccounts?: number
  showFavorite?: boolean
  size?: 'small' | 'medium'
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({
  addressNames = {},
  iconOnly,
  iconSize,
  icons,
  maxAccounts = 1,
  showFavorite = false,
  size = 'small',
  ...props
}) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <WalletAccountSelect
        addressNames={addressNames}
        fullWidth
        showFavorite={showFavorite}
        iconSize={iconSize}
        iconOnly={iconOnly}
        icons={icons}
        maxAccounts={maxAccounts}
        size={size ?? 'small'}
        variant="outlined"
      />
    </FlexCol>
  )
}
