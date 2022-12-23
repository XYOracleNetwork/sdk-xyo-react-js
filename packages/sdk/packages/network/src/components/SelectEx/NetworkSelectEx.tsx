import { MenuItem } from '@mui/material'
import { assertEx } from '@xylabs/assert'
import { SelectEx, SelectExProps } from '@xylabs/react-common'
import { useBreakpoint } from '@xylabs/react-shared'

import { useNetwork } from '../../contexts'
import { findNetworkConfig } from '../../lib'

export interface NetworkSelectExProps extends SelectExProps<string> {
  responsive?: boolean
}

export const NetworkSelectEx: React.FC<NetworkSelectExProps> = ({ onChange, responsive = true, ...props }) => {
  const { network, setNetwork, networks } = useNetwork(false)
  const sm = useBreakpoint() === 'sm'
  return (
    <SelectEx
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
      {networks?.map((network) => {
        return (
          <MenuItem key={network.slug} value={network.slug}>
            {responsive && sm ? network.name?.[0].toUpperCase() : network.name}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
