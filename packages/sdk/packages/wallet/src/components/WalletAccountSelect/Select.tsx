import { SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { AddressMenuItemRenderer } from '@xyo-network/react-address-plugin'

import { useWallet } from '../../contexts'

export interface WalletAccountSelectProps extends SelectProps<number> {
  favorites?: number[]
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  maxAccounts?: number
  showFavorite?: boolean
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({
  favorites,
  iconOnly,
  iconSize = 24,
  icons,
  maxAccounts = 1,
  showFavorite = false,
  size,
  ...props
}) => {
  const { activeAccountIndex = 0, setActiveAccountIndex, wallet } = useWallet()

  return (
    <SelectEx
      renderValue={(selected) => {
        console.log(selected)
        const account = wallet?.deriveAccount(selected.toString())
        return <AddressMenuItemRenderer address={account?.addressValue.hex} iconOnly={iconOnly} iconSize={iconSize} icons={icons} />
      }}
      value={activeAccountIndex}
      onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
      size={size}
      variant="outlined"
      {...props}
    >
      {wallet
        ? arrayRange(maxAccounts).map((index) => {
            const account = wallet?.deriveAccount(index.toString())
            return (
              <AddressMenuItemRenderer
                address={account?.addressValue.hex}
                favorite={favorites?.includes(index)}
                iconOnly={iconOnly}
                iconSize={iconSize}
                icons={icons}
                key={account?.addressValue.hex}
                value={index}
                showFavorite={showFavorite}
              />
            )
          })
        : null}
    </SelectEx>
  )
}
