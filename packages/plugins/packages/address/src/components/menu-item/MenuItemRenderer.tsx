import type { MenuItemProps } from '@mui/material'
import {
  Alert, CircularProgress, MenuItem,
} from '@mui/material'
import type { AddressPayload } from '@xyo-network/module-model'
import { AddressRenderRowBox } from '@xyo-network/react-address-render'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

export const AddressMenuItemRenderer = forwardRef<HTMLLIElement, PayloadRenderProps & MenuItemProps>(({
  children, payload, ...props
}, ref) => {
  const { address } = (payload as AddressPayload) ?? {}
  return (
    <MenuItem ref={ref} value={address} title={address} {...props}>
      {payload === null
        ? <Alert severity="error">Missing Address</Alert>
        : null}
      {payload === undefined
        ? <CircularProgress size={16} />
        : null}
      {address ? <AddressRenderRowBox address={address} icons /> : null}
      {children}
    </MenuItem>
  )
})

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
