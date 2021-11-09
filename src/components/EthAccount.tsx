import { Box, BoxProps, Button } from '@mui/material'
import { EthAddress } from '@xyo-network/sdk-xyo-js'
import React, { useContext } from 'react'

import { EthersContext } from '../contexts'
import { useNavigateToEthAddress } from '../hooks'
import { FlexRow } from './FlexBox'
import Identicon from './Identicon'

interface EthAccountProps extends BoxProps {
  address?: EthAddress | null
  auto?: boolean
  full?: boolean
  icon?: boolean
  onClick?: () => void
  size?: number
  text?: boolean
  to?: string
  toEtherScan?: boolean
}

const EthAccount: React.FC<EthAccountProps> = (props: EthAccountProps) => {
  const { localAddress } = useContext(EthersContext)
  const { navigateToEthAddress } = useNavigateToEthAddress()
  const {
    address,
    icon = true,
    text = true,
    full = false,
    auto,
    size = 16,
    to,
    onClick,
    toEtherScan,
    ...rootProps
  } = props

  if (address) {
    const isLocalAddress = localAddress?.toString() === address.toString()

    const onClickLocal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation()
      if (onClick) {
        onClick()
      } else {
        navigateToEthAddress(address, event, 'entity', to, toEtherScan)
      }
    }

    return (
      <FlexRow margin={0.5} title={`0x${address?.toHex()}`} {...rootProps}>
        <Button fullWidth style={{ padding: 0 }} variant="outlined">
          <Box alignItems="center" display="flex" flexGrow={1} onClick={onClickLocal} style={{ cursor: 'pointer' }}>
            <Box alignItems="center" display={icon ? 'flex' : 'none'} padding={1}>
              <Identicon size={size} value={address?.toHex()} />
            </Box>
            <Box display="flex" marginX={1}>
              <Box sx={{ mdDown: { display: 'none' } }} alignItems="center" display={text ? 'flex' : 'none'}>
                {full || auto ? address.toString() : address.toShortString()}
              </Box>
              <Box
                sx={{ mdUp: { display: 'none' }, xs: { display: 'none' } }}
                alignItems="center"
                display={text ? 'flex' : 'none'}
                flexGrow={1}
              >
                {full && !auto ? address.toString() : address.toShortString()}
              </Box>
              <Box
                sx={{ lgUp: { display: 'none' }, smDown: { display: 'none' } }}
                alignItems="center"
                display={text ? 'flex' : 'none'}
                flexGrow={1}
              >
                {full && !auto ? address.toString() : address.toShortString()}
              </Box>
              <Box sx={{ smUp: { display: 'none' } }} alignItems="center" display={text ? 'flex' : 'none'} flexGrow={1}>
                {full && !auto ? address.toString() : address.toShortString()}
              </Box>
              <Box display={isLocalAddress ? 'flex' : 'none'} marginLeft={0.5}>
                (You)
              </Box>
            </Box>
          </Box>
        </Button>
      </FlexRow>
    )
  } else {
    return <FlexRow {...rootProps}>{' - - '}</FlexRow>
  }
}

export default EthAccount
