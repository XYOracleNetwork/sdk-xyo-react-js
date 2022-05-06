import { MenuItem, Select, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { EthAccountBox, FlexGrowCol } from '@xylabs/sdk-react'

import { useWallet } from '../../contexts'

export interface WalletAccountSelectProps extends SelectProps<number> {
  iconOnly?: boolean
  icons?: boolean
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({ icons, iconOnly, ...props }) => {
  const { wallet, activeAccountIndex = 0, setActiveAccountIndex } = useWallet()

  console.log(`wallet: ${wallet}`)

  return (
    <Select
      renderValue={(selected) => {
        const account = wallet?.getAccount(parseInt(`${selected}`))
        return <EthAccountBox margin="2px" iconSize={20} icon={icons} iconOnly={iconOnly} address={EthAddress.fromString(account?.addressValue.hex)} />
      }}
      value={activeAccountIndex}
      onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
      {...props}
    >
      {wallet
        ? arrayRange(10).map((index) => {
            const account = wallet?.getAccount(index)
            return (
              <MenuItem key={index} value={index}>
                <EthAccountBox iconSize={20} icon={icons} address={EthAddress.fromString(account.addressValue.hex)} />
              </MenuItem>
            )
          })
        : null}
    </Select>
  )
}
