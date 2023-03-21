import { CircularProgress, MenuItem, SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { AddressRenderRowBox, AddressRenderRowBoxPropsBase } from '@xyo-network/react-address-render'

import { useWallet } from '../../contexts'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxPropsBase, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export interface WalletAccountSelectProps extends SharedAddressRenderRowBoxProps, SelectProps<number> {
  favorites?: number[]

  maxAccounts?: number
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
  const disabled = !wallet || activeAccountIndex === undefined

  return (
    <>
      {wallet ? (
        <SelectEx
          disabled={disabled}
          renderValue={(selected) => {
            const account = wallet.deriveAccount(selected.toString())
            return <AddressRenderRowBox address={account?.addressValue.hex} iconOnly={iconOnly} iconSize={iconSize} icons={icons} />
          }}
          value={activeAccountIndex}
          onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
          size={size}
          variant="outlined"
          {...props}
        >
          {arrayRange(maxAccounts).map((index) => {
            const account = wallet.deriveAccount(index.toString())
            return (
              <MenuItem key={account?.addressValue.hex} value={index}>
                <AddressRenderRowBox
                  address={account?.addressValue.hex}
                  favorite={favorites?.includes(index)}
                  iconOnly={iconOnly}
                  iconSize={iconSize}
                  icons={icons}
                  showFavorite={showFavorite}
                />
              </MenuItem>
            )
          })}
        </SelectEx>
      ) : (
        <CircularProgress size={24} />
      )}
    </>
  )
}
