import { BoxProps } from '@mui/material'
import { EthAddress } from '@xyo-network/sdk-xyo-js'
import { NavigateOptions, To } from 'react-router-dom'

interface EthAccountProps extends BoxProps {
  address?: EthAddress | null
  auto?: boolean
  full?: boolean
  icon?: boolean
  size?: number
  text?: boolean
  to?: To
  toOptions?: NavigateOptions
  page?: string
  toEtherScan?: boolean
}

export default EthAccountProps
