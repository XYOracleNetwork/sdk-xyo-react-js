import { CircularProgress, MenuItem, SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { AddressRenderRowBox, AddressRenderRowBoxPropsBase } from '@xyo-network/react-address-render'

import { useWalletContext } from '../../contexts'
import { useAccount, useWallet } from '../../hooks'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxPropsBase, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export interface WalletAccountSelectProps extends SharedAddressRenderRowBoxProps, SelectProps<number> {
  addressNames?: Record<string, string | undefined>
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({
  addressNames = {},
  iconOnly,
  iconSize = 24,
  icons,
  maxAccounts = 1,
  showFavorite = false,
  size,
  ...props
}) => {
  const { activeAccountIndex = 0, setActiveAccountIndex, coinTypeWallet } = useWalletContext()
  const disabled = !coinTypeWallet || activeAccountIndex === undefined

  return (
    <>
      {coinTypeWallet ? (
        <SelectEx
          disabled={disabled}
          renderValue={(selected) => {
            const Item: React.FC = () => {
              const [account] = useWallet({ path: selected.toString(), wallet: coinTypeWallet })
              const customName = account ? addressNames[account.address] : undefined
              const favorite = account && account.address in addressNames
              return (
                <AddressRenderRowBox
                  address={account?.address}
                  iconOnly={iconOnly}
                  iconSize={iconSize}
                  icons={icons}
                  name={customName}
                  favorite={favorite}
                  showFavorite={showFavorite}
                />
              )
            }
            return <Item />
          }}
          value={activeAccountIndex}
          onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
          size={size}
          variant="outlined"
          {...props}
        >
          {arrayRange(maxAccounts).map((index) => {
            const Item: React.FC = () => {
              const [account] = useAccount({ index, wallet: coinTypeWallet })
              const customName = account ? addressNames[account.address] : undefined
              const favorite = account && account.address in addressNames
              return (
                <MenuItem key={account?.address} value={index}>
                  <AddressRenderRowBox
                    address={account?.address}
                    favorite={favorite}
                    iconOnly={iconOnly}
                    iconSize={iconSize}
                    icons={icons}
                    name={customName}
                    showFavorite={showFavorite}
                  />
                </MenuItem>
              )
            }

            return <Item key={index} />
          })}
        </SelectEx>
      ) : (
        <CircularProgress size={24} />
      )}
    </>
  )
}
