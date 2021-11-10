import { Typography } from '@mui/material'

import { ButtonEx } from '../ButtonEx'
import { FlexGrowRow, FlexRow } from '../FlexBox'
import xyoLogo from './img/xyo.svg'
import TokenAmountProps from './TokenAmountProps'

const TokenAmount: React.FC<TokenAmountProps> = (props) => {
  const { amount, variant = 'outlined', logo, textColor, label, onClick, ...buttonExProps } = props

  const adjustedAmount = amount?.shln(18).toNumber()

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
