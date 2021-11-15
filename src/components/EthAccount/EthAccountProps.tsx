import { BoxProps } from '@mui/material'
import { EthAddress } from '@xylabs/sdk-js'
import { MouseEventHandler } from 'react'
import { NavigateOptions, To } from 'react-router-dom'

interface EthAccountProps extends BoxProps {
  address?: EthAddress | null
  auto?: boolean
  full?: boolean
  icon?: boolean
  iconOnly?: boolean
  size?: number
  text?: boolean
  to?: To
  toOptions?: NavigateOptions
  page?: string
  toEtherScan?: boolean
  onButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export default EthAccountProps
