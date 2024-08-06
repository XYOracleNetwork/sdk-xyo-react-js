import { Alert, CircularProgress, MenuItem, MenuItemProps } from '@mui/material'
import { AddressPayload } from '@xyo-network/module-model'
import { AddressRenderRowBox } from '@xyo-network/react-address-render'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

export const AddressMenuItemRenderer = forwardRef<HTMLLIElement, PayloadRenderProps & MenuItemProps>(({ children, payload, ...props }, ref) => {
  const { address } = (payload as AddressPayload) ?? {}
  return (
    <>
      {address
        ? (
            <MenuItem ref={ref} value={address} title={address} {...props}>
              <AddressRenderRowBox address={address} icons />
              {children}
            </MenuItem>
          )
        : null}
      {payload === null
        ? <Alert severity="error">Missing Address</Alert>
        : null}
      {payload === undefined
        ? <CircularProgress size={16} />
        : null}
    </>
  )
})

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
