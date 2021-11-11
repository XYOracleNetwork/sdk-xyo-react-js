import { Typography } from '@mui/material'
import { BigNumber } from '@xyo-network/sdk-xyo-js'

import { ButtonEx } from '../ButtonEx'
import { FlexGrowRow, FlexRow } from '../FlexBox'
import xyoLogo from './img/xyo.svg'
import TokenAmountProps from './TokenAmountProps'

const base10Shift = (bn: BigNumber, places: number) => {
  const factor = new BigNumber(10).pow(new BigNumber(Math.abs(places)))
  if (places > 0) {
    return bn.mul(factor)
  } else {
    return bn.div(factor)
  }
}

const TokenAmount: React.FC<TokenAmountProps> = (props) => {
  const { amount, places = -18, variant = 'outlined', logo, textColor, label, onClick, ...buttonExProps } = props

  const adjustedAmount = amount ? base10Shift(amount, places).toNumber() : undefined

  const amountString = adjustedAmount ? Math.trunc(adjustedAmount).toLocaleString() : '-'

  const fontFamily = '"Source Code Pro",monospace'

  return (
    <ButtonEx onClick={onClick} variant={variant} {...buttonExProps}>
      <FlexRow
        justifyContent="space-between"
        minHeight="2.2em"
        minWidth="6em"
        width="100%"
        busy={!amount}
        busySize={16}
      >
        {logo ? <img src={xyoLogo} height={24} /> : null}
        {label ? (
          <FlexRow marginRight={1}>
            <Typography noWrap={true} style={{ color: textColor, fontFamily }} variant="caption">
              {label}
            </Typography>
          </FlexRow>
        ) : null}
        {logo ? <FlexRow></FlexRow> : null}
        <FlexGrowRow flexGrow={1} justifyContent="flex-end" marginLeft={1}>
          <Typography noWrap={true} color={textColor} fontFamily={fontFamily} variant="body1">
            {amountString}
          </Typography>
        </FlexGrowRow>
      </FlexRow>
    </ButtonEx>
  )
}

export default TokenAmount
