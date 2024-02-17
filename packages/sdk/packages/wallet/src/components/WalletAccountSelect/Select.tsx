import { CircularProgress, MenuItem, SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { AddressRenderRowBox, AddressRenderRowBoxProps } from '@xyo-network/react-address-render'

import { useWalletContext } from '../../contexts'
import { useWallet } from '../../hooks'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxProps, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export interface WalletAccountSelectProps extends SharedAddressRenderRowBoxProps, SelectProps<number> {
  addressNames?: Record<string, string | undefined>
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return [...Array.from({ length }).keys()].map((x) => x + start)
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
      {coinTypeWallet ?
        <SelectEx
          margin="dense"
          disabled={disabled}
          renderValue={(selectedAccountIndex) => {
            const Item: React.FC = () => {
              const [selectedAccount] = useWallet({ path: selectedAccountIndex.toString(), wallet: coinTypeWallet })
              const customName = selectedAccount ? addressNames[selectedAccount.address] : undefined
              const favorite = !!selectedAccount && selectedAccount.address in addressNames
              return (
                <MenuItem value={selectedAccountIndex} sx={{ minHeight: 0, paddingBottom: 0, paddingTop: 0 }}>
                  <AddressRenderRowBox
                    disableSharedRef={true}
                    flexGrow={1}
                    address={selectedAccount?.address}
                    iconOnly={iconOnly}
                    iconSize={iconSize}
                    icons={icons}
                    name={customName}
                    favorite={favorite}
                    showFavorite={showFavorite}
                  />
                </MenuItem>
              )
            }
            return <Item />
          }}
          value={activeAccountIndex}
          onChange={(event) => setActiveAccountIndex?.(Number.parseInt(`${event.target.value}`))}
          size={size}
          variant="outlined"
          {...props}
        >
          {arrayRange(maxAccounts).map((index) => {
            const Item: React.FC = () => {
              const [account] = useWallet({ path: index.toString(), wallet: coinTypeWallet })
              const customName = account ? addressNames[account.address] : undefined
              const favorite = !!account && account.address in addressNames
              return (
                <MenuItem key={account?.address} value={index} sx={{ minHeight: 0, paddingBottom: 0, paddingTop: 0 }}>
                  <AddressRenderRowBox
                    disableSharedRef={true}
                    flexGrow={1}
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
      : <CircularProgress size={24} />}
    </>
  )
}
