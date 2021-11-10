import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { MouseEvent, useContext } from 'react'

import { EthersContext } from '../../contexts'
import { FlexGrowRow, FlexRow } from '../FlexBox'
import Identicon from '../Identicon'
import EthAccountProps from './EthAccountProps'

const EthAccount: React.FC<EthAccountProps> = ({
  address,
  icon = true,
  text = true,
  full = false,
  auto,
  size = 16,
  onClick,
  toEtherScan,
  ...props
}) => {
  const { localAddress } = useContext(EthersContext)
  const theme = useTheme()

  const large = useMediaQuery(theme.breakpoints.up('md'))
  const fontFamily = '"Source Code Pro",monospace'

  if (address) {
    const isLocalAddress = localAddress?.toString() === address.toString()

    const onClickLocal = (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
      if (toEtherScan) {
        window.open(`https://etherscan.io/address/${address.toString()}`, '_blank')
      }
    }

    const testToDisplay = full || !auto ? address.toString() : large ? address.toString() : address.toShortString()

    return (
      <FlexRow margin={0.5} title={`0x${address?.toHex()}`} {...props}>
        <Button fullWidth style={{ padding: 0 }} variant="outlined">
          <FlexGrowRow alignItems="center" onClick={onClickLocal} style={{ cursor: 'pointer' }}>
            {icon ? (
              <FlexRow alignItems="center" padding={1}>
                <Identicon size={size} value={address?.toHex()} />
              </FlexRow>
            ) : null}
            <FlexRow marginX={1}>
              {text ? (
                <FlexRow alignItems="center">
                  <Typography variant="button" fontFamily={fontFamily}>
                    {testToDisplay}
                  </Typography>
                </FlexRow>
              ) : null}
              {isLocalAddress ? <Box marginLeft={0.5}>(You)</Box> : null}
            </FlexRow>
          </FlexGrowRow>
        </Button>
      </FlexRow>
    )
  } else {
    return <FlexRow {...props}>{' - - '}</FlexRow>
  }
}

export default EthAccount
