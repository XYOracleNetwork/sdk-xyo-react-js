import { MenuItem, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { SelectEx } from '@xylabs/react-select'
import { AddressMenuItemRenderer } from '@xyo-network/react-address-plugin'

import { useWallet } from '../../contexts'

export interface WalletAccountSelectProps extends SelectProps<number> {
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({ iconOnly, iconSize = 24, icons, maxAccounts = 1, size, ...props }) => {
  const { activeAccountIndex = 0, setActiveAccountIndex, wallet } = useWallet()

  return (
    <SelectEx
      renderValue={(selected) => {
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
                key={account?.addressValue.hex}
                address={account?.addressValue.hex}
                iconOnly={iconOnly}
                iconSize={iconSize}
                icons={icons}
              />
            )
          })
        : null}
    </SelectEx>
  )
}
