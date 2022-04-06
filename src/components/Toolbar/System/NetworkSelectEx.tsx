import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useAppSettings, useNetwork } from '../../../contexts'
import { findNetworkPreset, networkPresets } from '../../../lib'

export const NetworkSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { darkMode } = useAppSettings()
  const { network, setNetwork } = useNetwork()
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
          setNetwork?.(findNetworkPreset(event.target.value))
        }
      }}
      {...props}
    >
      {networkPresets.map((network) => {
        return (
          <MenuItem key={network.slug} value={network.slug}>
            {network.name}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
