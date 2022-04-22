import { MenuItem, Select, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { EthAccount } from '@xylabs/sdk-react'
import { XyoWebWallet } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

export interface WalletAccountSelectProps extends SelectProps<string> {
  phrase?: string
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({ phrase, ...props }) => {
  const wallet = phrase ? new XyoWebWallet(phrase) : undefined
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(wallet?.getAccount(0).addressValue.hex)
  return (
    <Select value={selectedAddress} onChange={(event) => setSelectedAddress(event.target.value)} {...props}>
      {wallet
        ? arrayRange(10).map((index) => {
            const account = wallet?.getAccount(index)
            return (
              <MenuItem key={index} value={account.addressValue.hex}>
                <EthAccount icon address={EthAddress.fromString(account.addressValue.hex)} />
              </MenuItem>
            )
          })
        : null}
    </Select>
  )
}
