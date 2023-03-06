import { MenuItem, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { SelectEx } from '@xylabs/react-common'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'

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
  const { deriveRootAccount, activeAccountIndex = 0, setActiveAccountIndex, wallet } = useWallet()

  return (
    <SelectEx
      renderValue={(selected) => {
        const account = deriveRootAccount?.(selected.toString())
        return (
          <FlexRow justifyContent="flex-start" gap={1}>
            {icons ? (
              <FlexRow>
                <Identicon size={iconSize} value={account?.addressValue.hex} />
              </FlexRow>
            ) : null}
            <EthAccountBox alignItems="stretch" iconOnly={iconOnly} address={EthAddress.fromString(account?.addressValue.hex)} />
          </FlexRow>
        )
      }}
      value={activeAccountIndex}
      onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
      size={size}
      variant="outlined"
      {...props}
    >
      {wallet
        ? arrayRange(maxAccounts).map((index) => {
            const account = deriveRootAccount?.(index.toString())
            return (
              <MenuItem key={index} value={index}>
                <EthAccountBox iconSize={iconSize} icon={icons} address={EthAddress.fromString(account?.addressValue.hex)} />
              </MenuItem>
            )
          })
        : null}
    </SelectEx>
  )
}
