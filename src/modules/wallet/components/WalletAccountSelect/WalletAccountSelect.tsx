import { MenuItem, Select, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { EthAccount } from '@xylabs/sdk-react'
import { XyoWalletBase, XyoWebWallet } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { useWallet } from '../../contexts'

export interface WalletAccountSelectProps extends SelectProps<string> {
  wallet?: XyoWalletBase
  phrase?: string
  iconOnly?: boolean
  icons?: boolean
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({ wallet: walletProp, icons, iconOnly, phrase, ...props }) => {
  const { wallet = walletProp ?? (phrase ? new XyoWebWallet(phrase) : undefined), activeAccount, setActiveAccount } = useWallet()
  const [selected, setSelected] = useState(`${activeAccount}` ?? '')

  useEffect(() => {
    setActiveAccount?.(parseInt(selected))
  }, [selected, setActiveAccount])

  return (
    <Select
      renderValue={(selected) => {
        const account = wallet?.getAccount(parseInt(selected))
        return <EthAccount icon={icons} iconOnly={iconOnly} address={EthAddress.fromString(account?.addressValue.hex)} />
      }}
      value={selected}
      onChange={(event) => setSelected(event.target.value)}
      {...props}
    >
      {wallet
        ? arrayRange(10).map((index) => {
            const account = wallet?.getAccount(index)
            return (
              <MenuItem key={index} value={index}>
                <EthAccount icon={icons} address={EthAddress.fromString(account.addressValue.hex)} />
              </MenuItem>
            )
          })
        : null}
    </Select>
  )
}
