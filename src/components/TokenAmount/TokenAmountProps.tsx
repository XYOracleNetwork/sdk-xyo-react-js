import { BigNumber } from '@xyo-network/sdk-xyo-js'

import { ButtonExProps } from '../ButtonEx'

interface TokenAmountProps extends ButtonExProps {
  amount?: BigNumber | null
  label?: string
  logo?: boolean
  onClick?: () => void
  textColor?: string
}

export default TokenAmountProps
