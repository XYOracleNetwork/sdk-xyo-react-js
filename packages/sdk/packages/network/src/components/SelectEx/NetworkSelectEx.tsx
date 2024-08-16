import { MenuItem } from '@mui/material'
import { assertEx } from '@xylabs/assert'
import type { SelectExProps } from '@xylabs/react-select'
import { SelectEx } from '@xylabs/react-select'
import { useBreakpoint } from '@xylabs/react-shared'
import React from 'react'

import { useNetwork } from '../../contexts/index.ts'
import { findNetworkConfig } from '../../lib/index.ts'

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
