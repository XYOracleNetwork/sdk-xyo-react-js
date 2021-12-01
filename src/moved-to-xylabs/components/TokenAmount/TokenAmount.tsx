/* eslint-disable @delagen/deprecation/deprecation */
import { Typography } from '@mui/material'
import { BigNumber } from '@xylabs/sdk-js'

import { ButtonEx } from '../ButtonEx'
import { FlexRow } from '../FlexBox'
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

/** @deprecated Moved to @xylabs/sdk-react */
const TokenAmount: React.FC<TokenAmountProps> = ({ amount, places = -18, logo, label, onButtonClick, ...props }) => {
  const adjustedAmount = amount ? base10Shift(amount, places).toNumber() : undefined

  const amountString = adjustedAmount ? Math.trunc(adjustedAmount).toLocaleString() : '-'

  const fontFamily = '"Source Code Pro",monospace'

  return (
    <FlexRow margin={0.5} padding={0.5} {...props}>
      <ButtonEx fullWidth variant="outlined" onClick={onButtonClick}>
        <FlexRow justifyContent="space-between" width="100%" busy={!amount} busySize={16}>
          <FlexRow>
            {logo ? <img src={xyoLogo} height={24} /> : null}
            {label ? (
              <Typography
                marginRight={1}
                marginLeft={logo ? 1 : 0}
                noWrap={true}
                fontFamily={fontFamily}
                variant="caption"
              >
                {label}
              </Typography>
            ) : null}
          </FlexRow>
          <Typography noWrap={true} fontFamily={fontFamily} variant="body1" style={{ textTransform: 'none' }}>
            {amountString}
          </Typography>
        </FlexRow>
      </ButtonEx>
    </FlexRow>
  )
}

export default TokenAmount
