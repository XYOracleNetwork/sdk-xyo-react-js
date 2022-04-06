import { MenuItem } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useAppSettings } from '../../../../contexts'
import { useNetwork } from '../../Context'
import { findNetworkConfig } from '../../lib'

export const NetworkSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { darkMode } = useAppSettings()
  const { network, setNetwork, networks } = useNetwork()
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
            {network.name}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
