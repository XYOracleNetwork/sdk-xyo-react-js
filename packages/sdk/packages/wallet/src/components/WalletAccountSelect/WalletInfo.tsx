import { Circle as LoadingIcon, ErrorOutlined as ErrorIcon } from '@mui/icons-material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import type { AccountInstance } from '@xyo-network/account-model'
import React from 'react'

import { useRootWallet, useSelectedWalletAccount } from '../../contexts/index.ts'
import { useAccount, useWallet } from '../../hooks/index.ts'

/** @public */
export interface WalletErrorProps {
  error?: Error
}

/** @public */
export const WalletError: React.FC<WalletErrorProps> = ({ error }) => {
  return error
    ? (
        <div>
          <ErrorIcon
            style={{ fontSize: '12px', position: 'absolute' }}
            color="error"
          />
          <QuickTipButton
            size="small"
            style={{
              color: '#ffffff00', fontSize: '12px', padding: 0, position: 'absolute',
            }}
            hoverText={error.message}
            disableDialog
          />
        </div>
      )
    : null
}

/** @public */
export interface WalletIdenticonProps {
  account?: AccountInstance | null
  name: string
}

/** @public */
export const WalletIdenticon: React.FC<WalletIdenticonProps> = ({ account, name }) => {
  return (
    <div style={{ width: 20 }}>
      {account
        ? (
            <Identicon
              size={8}
              value={account.address}
              style={{
                position: 'absolute', right: 2, top: 2,
              }}
            />
          )
        : (
            <LoadingIcon
              style={{
                fontSize: '10px', padding: 0, position: 'absolute', right: 2, top: 2,
              }}
              color="disabled"
            />
          )}
      <QuickTipButton
        size="small"
        style={{
          color: '#ffffff00', fontSize: '12px', padding: 0, position: 'absolute',
        }}
        hoverText={`${name ?? ''}: ${account?.address ?? 'no address'}`}
        disableDialog
      />
    </div>
  )
}

/** @public */
export const RootWalletInfo: React.FC<FlexBoxProps> = (props) => {
  const [wallet, error] = useRootWallet()
  return (
    <FlexCol width={12} {...props}>
      {error ? null : <WalletIdenticon name="Root" account={wallet} />}
      <WalletError error={error} />
    </FlexCol>
  )
}

/** @public */
export const SelectedWalletInfo: React.FC<FlexBoxProps> = (props) => {
  const [wallet, error] = useSelectedWalletAccount()
  return (
    <FlexCol width={12} {...props}>
      {error ? null : <WalletIdenticon name="Selected" account={wallet} />}
      <WalletError error={error} />
    </FlexCol>
  )
}

/** @public */
export const WalletInfo: React.FC<FlexBoxProps> = (props) => {
  const [wallet, error] = useWallet()
  return (
    <FlexCol width={12} {...props}>
      {error ? null : <WalletIdenticon name="Wallet" account={wallet} />}
      <WalletError error={error} />
    </FlexCol>
  )
}

/** @public */
export const AccountInfo: React.FC<FlexBoxProps> = (props) => {
  const [account, error] = useAccount()
  return (
    <FlexCol width={12} {...props}>
      {error ? null : <WalletIdenticon name="Account" account={account} />}
      <WalletError error={error} />
    </FlexCol>
  )
}
