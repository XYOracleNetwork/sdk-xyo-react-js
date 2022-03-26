import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useAppSettings } from '../../../contexts'
import { findNetworkPreset, networkPresets } from '../../../lib'

export const NetworkSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  console.log('NetworkSelectEx')
  const { changeNetwork, network, darkMode } = useAppSettings()
  return (
    <SelectEx
      colorize="primary"
      mode={darkMode ? 'dark' : 'light'}
      variant="outlined"
      size="small"
      value={network?.slug}
      onChange={(event, child) => {
        onChange?.(event, child)
        changeNetwork?.(findNetworkPreset(event.target.value))
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
