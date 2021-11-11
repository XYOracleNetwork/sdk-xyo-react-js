import { Typography, useMediaQuery, useTheme } from '@mui/material'
import { MouseEvent, useContext } from 'react'

import { EthersContext } from '../../contexts'
import { ButtonEx } from '..'
import { FlexGrowRow, FlexRow } from '../FlexBox'
import Identicon from '../Identicon'
import EthAccountProps from './EthAccountProps'

const EthAccount: React.FC<EthAccountProps> = ({
  address,
  icon = false,
  iconOnly = false,
  full = false,
  auto,
  size = 16,
  toEtherScan,
  onButtonClick,
  ...props
}) => {
  const { localAddress } = useContext(EthersContext)
  const theme = useTheme()

  const large = useMediaQuery(theme.breakpoints.up('md'))
  const fontFamily = '"Source Code Pro",monospace'

  if (address) {
    const isLocalAddress = localAddress?.toString() === address.toString()

    const onClickLocal = (event: MouseEvent<HTMLButtonElement>) => {
      onButtonClick?.(event)
      if (toEtherScan) {
        window.open(`https://etherscan.io/address/${address.toString()}`, '_blank')
      }
    }

    const testToDisplay = full || !auto ? address.toString() : large ? address.toString() : address.toShortString()

    return (
      <FlexRow margin={0.5} padding={0.5} title={`0x${address?.toHex()}`} {...props}>
        <ButtonEx fullWidth onClick={onClickLocal} variant="outlined">
          <FlexGrowRow justifyContent="space-between" alignItems="center">
            {icon ? <Identicon size={size} value={address?.toHex()} /> : null}
            {iconOnly ? null : (
              <Typography variant="body1" fontFamily={fontFamily} style={{ textTransform: 'none' }}>
                {testToDisplay}
              </Typography>
            )}
            {isLocalAddress ? <FlexRow marginLeft={0.5}>(You)</FlexRow> : null}
          </FlexGrowRow>
        </ButtonEx>
      </FlexRow>
    )
  } else {
    return <FlexRow {...props}>{' - - '}</FlexRow>
  }
}

export default EthAccount
