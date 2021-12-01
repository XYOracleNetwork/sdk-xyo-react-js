/* eslint-disable @delagen/deprecation/deprecation */
import { BigNumber } from '@xylabs/sdk-js'
import { MouseEventHandler } from 'react'

import { FlexBoxProps } from '../FlexBox'

/** @deprecated Moved to @xylabs/sdk-react */
interface TokenAmountProps extends FlexBoxProps {
  amount?: BigNumber | null
  label?: string
  logo?: boolean
  places?: number
  onButtonClick?: MouseEventHandler<HTMLButtonElement>
}

export default TokenAmountProps
