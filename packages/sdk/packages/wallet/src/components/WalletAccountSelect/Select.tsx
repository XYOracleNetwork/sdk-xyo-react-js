import { CircularProgress, SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { HDWallet } from '@xyo-network/account'
import { AddressRenderRowBox, AddressRenderRowBoxPropsBase } from '@xyo-network/react-address-render'
import { usePromise } from '@xyo-network/react-shared'

import { useWallet } from '../../contexts'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxPropsBase, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export interface WalletAccountSelectProps extends SharedAddressRenderRowBoxProps, SelectProps<number> {
  addressNames?: Record<string, string | undefined>
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const RenderValue: React.FC<{
  addressNames: Record<string, string | undefined>
  iconOnly?: boolean
  iconSize: number
  icons?: boolean
  selected: number
  showFavorite?: boolean
  wallet: HDWallet
}> = ({ iconOnly, iconSize, showFavorite, icons, addressNames, selected, wallet }) => {
  const [account] = usePromise<HDWallet>(() => wallet.derivePath(selected.toString()) as Promise<HDWallet>)
  const customName = account ? addressNames[account?.address] : undefined
  const favorite = account ? account?.address in addressNames : undefined
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
  const { activeAccountIndex = 0, setActiveAccountIndex, wallet } = useWallet()
  const disabled = !wallet || activeAccountIndex === undefined

  return (
    <>
      {wallet ? (
        <SelectEx
          disabled={disabled}
          renderValue={(selected) => (
            <RenderValue
              wallet={wallet}
              selected={selected}
              addressNames={addressNames}
              iconOnly={iconOnly}
              iconSize={iconSize}
              icons={icons}
              showFavorite={showFavorite}
            />
          )}
          value={activeAccountIndex}
          onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
          size={size}
          variant="outlined"
          {...props}
        >
          {arrayRange(maxAccounts).map((index) => (
            <RenderValue
              key={index}
              wallet={wallet}
              selected={index}
              addressNames={addressNames}
              iconOnly={iconOnly}
              iconSize={iconSize}
              icons={icons}
              showFavorite={showFavorite}
            />
          ))}
        </SelectEx>
      ) : (
        <CircularProgress size={24} />
      )}
    </>
  )
}
