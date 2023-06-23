import { CircularProgress, SelectProps } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import { AddressRenderRowBox, AddressRenderRowBoxPropsBase } from '@xyo-network/react-address-render'
import { WalletInstance } from '@xyo-network/wallet-model'

import { useWalletContext } from '../../contexts'
import { useWallet } from '../../hooks'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxPropsBase, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export interface WalletAccountSelectProps extends SharedAddressRenderRowBoxProps, SelectProps<number> {
  addressNames?: Record<string, string | undefined>
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export interface RenderValueProps {
  addressNames: Record<string, string | undefined>
  iconOnly?: boolean
  iconSize: number
  icons?: boolean
  index: number
  showFavorite?: boolean
  value: number
  wallet: WalletInstance
}

export const RenderValue: React.FC<RenderValueProps> = ({ iconOnly, iconSize, showFavorite, icons, addressNames, index, wallet, value }) => {
  const [account] = useWallet({ path: index.toString(), wallet })
  const customName = account ? addressNames[account?.address] : undefined
  const favorite = account ? account?.address in addressNames : undefined
  return (
    <AddressRenderRowBox
      component="li"
      address={account?.address}
      iconOnly={iconOnly}
      iconSize={iconSize}
      icons={icons}
      name={customName}
      favorite={favorite}
      showFavorite={showFavorite}
      defaultValue={value}
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
  const { activeAccountIndex = 0, setActiveAccountIndex, derivedWallet } = useWalletContext()
  const disabled = !derivedWallet || activeAccountIndex === undefined

  return (
    <>
      {derivedWallet ? (
        <SelectEx<number>
          disabled={disabled}
          renderValue={(value) => (
            <RenderValue
              wallet={derivedWallet}
              addressNames={addressNames}
              iconOnly={iconOnly}
              iconSize={iconSize}
              icons={icons}
              index={activeAccountIndex}
              value={value}
              showFavorite={showFavorite}
            />
          )}
          value={activeAccountIndex}
          onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
          size={size}
          variant="outlined"
          {...props}
        >
          {arrayRange(maxAccounts).map((index) => {
            console.log(`arie: ${index}`)
            return (
              <RenderValue
                key={index}
                wallet={derivedWallet}
                addressNames={addressNames}
                iconOnly={iconOnly}
                iconSize={iconSize}
                icons={icons}
                index={index}
                showFavorite={showFavorite}
                value={index}
              />
            )
          })}
        </SelectEx>
      ) : (
        <CircularProgress size={24} />
      )}
    </>
  )
}
