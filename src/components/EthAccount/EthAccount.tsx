import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import { useContext } from 'react'

import { EthersContext } from '../../contexts'
import { useNavigateToEthAddress } from '../../hooks'
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
  to,
  page,
  onClick,
  toEtherScan,
  ...props
}) => {
  const { localAddress } = useContext(EthersContext)
  const { navigateToEthAddress } = useNavigateToEthAddress()
  const theme = useTheme()

  const large = useMediaQuery(theme.breakpoints.up('md'))

  if (address) {
    const isLocalAddress = localAddress?.toString() === address.toString()

    const onClickLocal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation()
      if (onClick) {
        onClick()
      } else {
        navigateToEthAddress(address, event, page, to, toEtherScan)
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
              {text ? <FlexRow alignItems="center">{testToDisplay}</FlexRow> : null}
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
