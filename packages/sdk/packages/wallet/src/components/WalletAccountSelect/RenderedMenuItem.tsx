import { MenuItem, type MenuItemProps } from '@mui/material'
import { AddressRenderRowBox } from '@xyo-network/react-address-render'
import type { WalletInstance } from '@xyo-network/wallet-model'
import React from 'react'

import { useWallet } from '../../hooks/index.ts'

/** @public */
export interface RenderedAccountMenuItemProps extends MenuItemProps {
  addressNames?: Record<string, string | undefined>
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  rootWallet: WalletInstance
  selectedAccountIndex?: number
  showFavorite?: boolean
}

/** @public */
export const RenderedAccountMenuItem: React.FC<RenderedAccountMenuItemProps> = ({
  selectedAccountIndex,
  rootWallet,
  addressNames,
  iconOnly,
  iconSize,
  icons,
  showFavorite,
}) => {
  const [selectedAccount] = useWallet({ path: selectedAccountIndex?.toString(), wallet: rootWallet })
  const customName = selectedAccount ? addressNames?.[selectedAccount.address] : undefined
  const favorite = !!selectedAccount && selectedAccount.address in (addressNames ?? {})
  return (
    <MenuItem
      value={selectedAccountIndex}
      sx={{
        minHeight: 0, paddingBottom: 0, paddingTop: 0,
      }}
    >
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
