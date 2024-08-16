import type { SelectProps } from '@mui/material'
import { CircularProgress, MenuItem } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import type { AddressRenderRowBoxProps } from '@xyo-network/react-address-render'
import { AddressRenderRowBox } from '@xyo-network/react-address-render'
import React from 'react'

import { useWalletContext } from '../../contexts/index.ts'
import { useWallet } from '../../hooks/index.ts'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxProps, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export type WalletAccountSelectProps = SharedAddressRenderRowBoxProps &
  Omit<SelectProps<number>, 'variant'> &
  Partial<SelectProps<number>> & {
    addressNames?: Record<string, string | undefined>
    maxAccounts?: number
  }

const arrayRange = (length: number, start = 0) => {
  return [...Array.from({ length }).keys()].map(x => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({
  addressNames,
  iconOnly,
  iconSize = 24,
  icons,
  maxAccounts = 1,
  showFavorite = false,
  size,
  variant = 'outlined',
  ...props
}) => {
  const { activeAccountIndex = 0, setActiveAccountIndex, rootWallet } = useWalletContext()
  const disabled = !rootWallet || activeAccountIndex === undefined

  return (
    <>
      {rootWallet
        ? (
            <SelectEx
              margin="dense"
              disabled={disabled}
              renderValue={(selectedAccountIndex) => {
                // eslint-disable-next-line @eslint-react/no-nested-components
                const Item: React.FC = () => {
                  const [selectedAccount] = useWallet({ path: selectedAccountIndex.toString(), wallet: rootWallet })
                  const customName = selectedAccount ? addressNames?.[selectedAccount.address] : undefined
                  const favorite = !!selectedAccount && selectedAccount.address in (addressNames ?? {})
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
              onChange={event => setActiveAccountIndex?.(Number.parseInt(`${event.target.value}`))}
              size={size}
              variant={variant}
              {...props}
            >
              {arrayRange(maxAccounts).map((index) => {
                // eslint-disable-next-line @eslint-react/no-nested-components
                const Item: React.FC = () => {
                  const [account] = useWallet({ path: index.toString(), wallet: rootWallet })
                  const customName = account ? addressNames?.[account.address] : undefined
                  const favorite = !!account && account.address in (addressNames ?? {})
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
          )
        : <CircularProgress size={24} />}
    </>
  )
}
