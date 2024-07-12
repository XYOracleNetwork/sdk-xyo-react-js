import { MenuItem } from '@mui/material'
import { assertEx } from '@xylabs/assert'
import { SelectEx, SelectExProps } from '@xylabs/react-select'
import { useBreakpoint } from '@xylabs/react-shared'

import { useNetwork } from '../../contexts/index.js'
import { findNetworkConfig } from '../../lib/index.js'

export type NetworkSelectExProps = Omit<SelectExProps<string>, 'variant'> &
  Partial<SelectExProps<string>> & {
    responsive?: boolean
  }

export const NetworkSelectEx: React.FC<NetworkSelectExProps> = ({ onChange, variant = 'outlined', responsive = true, ...props }) => {
  const { network, setNetwork, networks } = useNetwork(false)
  const sm = useBreakpoint() === 'sm'
  return (
    <SelectEx
      variant={variant}
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
