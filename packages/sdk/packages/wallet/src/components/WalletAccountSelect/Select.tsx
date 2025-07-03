import type { SelectProps } from '@mui/material'
import { CircularProgress, MenuItem } from '@mui/material'
import { SelectEx } from '@xylabs/react-select'
import type { AddressRenderRowBoxProps } from '@xyo-network/react-address-render'
import { AddressRenderRowBox } from '@xyo-network/react-address-render'
import React from 'react'

import { useWalletContext } from '../../contexts/index.ts'
import { useWallet } from '../../hooks/index.ts'
import { RenderedAccountMenuItem } from './RenderedMenuItem.tsx'

type SharedAddressRenderRowBoxProps = Pick<AddressRenderRowBoxProps, 'iconOnly' | 'iconSize' | 'icons' | 'showFavorite'>

export type WalletAccountSelectProps = SharedAddressRenderRowBoxProps
  & Omit<SelectProps<number>, 'variant'>
  & Partial<SelectProps<number>> & {
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
  const {
    activeAccountIndex, setActiveAccountIndex, rootWallet,
  } = useWalletContext()
  const disabled = !rootWallet || activeAccountIndex === undefined

  return (
    <>
      {rootWallet
        ? (
            <SelectEx
              margin="dense"
              disabled={disabled}
              renderValue={(selectedAccountIndex) => {
                return (
                  <RenderedAccountMenuItem
                    addressNames={addressNames}
                    iconOnly={iconOnly}
                    iconSize={iconSize}
                    icons={icons}
                    rootWallet={rootWallet}
                    selectedAccountIndex={selectedAccountIndex}
                    showFavorite={showFavorite}
                  />
                )
              }}
              value={activeAccountIndex === undefined ? '' : activeAccountIndex}
              onChange={event => setActiveAccountIndex?.(Number.parseInt(`${event.target.value}`))}
              size={size}
              variant={variant}
              {...props}
            >
              {rootWallet && arrayRange(maxAccounts).map((index) => {
                const [account] = useWallet({ path: index.toString(), wallet: rootWallet })
                const customName = account ? addressNames?.[account.address] : undefined
                const favorite = !!account && account.address in (addressNames ?? {})
                return (
                  <MenuItem
                    key={account?.address}
                    value={index}
                    sx={{
                      minHeight: 0, paddingBottom: 0, paddingTop: 0,
                    }}
                  >
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
              })}
            </SelectEx>
          )
        : <CircularProgress size={24} />}
    </>
  )
}
