import { MenuItem } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { SelectEx, SelectExProps, useBreakpoint } from '@xylabs/sdk-react'

import { useAppSettings } from '../../../settings'
import { useNetwork } from '../../contexts'
import { findNetworkConfig } from '../../lib'

export interface NetworkSelectExProps extends SelectExProps<string> {
  responsive?: boolean
}

export const NetworkSelectEx: React.FC<NetworkSelectExProps> = ({ onChange, responsive = true, ...props }) => {
  const { darkMode } = useAppSettings()
  const { network, setNetwork, networks } = useNetwork(true)
  const sm = useBreakpoint() === 'sm'
  return (
    <SelectEx
      colorize="primary"
      mode={darkMode ? 'dark' : 'light'}
      variant="outlined"
      size="small"
      value={network?.slug ?? ''}
      onChange={(event, child) => {
        if (event.target.value !== network?.slug) {
          onChange?.(event, child)
          setNetwork?.(assertEx(findNetworkConfig(event.target.value, networks)))
        }
      }}
      {...props}
    >
      {networks.map((network) => {
        return (
          <MenuItem key={network.slug} value={network.slug}>
            {responsive && sm ? network.name[0].toUpperCase() : network.name}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
