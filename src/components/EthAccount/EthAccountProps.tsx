import { BoxProps } from '@mui/material'
import { EthAddress } from '@xyo-network/sdk-xyo-js'

interface EthAccountProps extends BoxProps {
  address?: EthAddress | null
  auto?: boolean
  full?: boolean
  icon?: boolean
  onClick?: () => void
  size?: number
  text?: boolean
  to?: string
  page?: string
  toEtherScan?: boolean
}

export default EthAccountProps
