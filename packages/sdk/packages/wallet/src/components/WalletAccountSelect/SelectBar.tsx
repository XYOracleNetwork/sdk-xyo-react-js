import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { WalletAccountSelect } from './Select'

export interface WalletAccountSelectBarProps extends FlexBoxProps {
  favorites?: number[]
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  maxAccounts?: number
  showFavorite?: boolean
  size?: 'small' | 'medium'
}

export const WalletAccountSelectBar: React.FC<WalletAccountSelectBarProps> = ({
  favorites,
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
        favorites={favorites}
        fullWidth
        showFavorite={showFavorite}
        iconSize={iconSize}
        iconOnly={iconOnly}
        icons={icons}
        maxAccounts={maxAccounts}
        size={size ?? 'small'}
      />
    </FlexCol>
  )
}
