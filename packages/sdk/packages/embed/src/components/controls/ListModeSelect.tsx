import { MenuItem } from '@mui/material'
import type { SelectExProps } from '@xylabs/react-select'
import { SelectEx } from '@xylabs/react-select'
import type { ListMode } from '@xyo-network/react-shared'
import { useListMode } from '@xyo-network/react-shared'
import React from 'react'

import { EmbedFormControl } from './EmbedFormControl.tsx'

const listModeSelectId = 'listmode-select-id'
const listModeSelectLabel = 'List Mode'

export const ListModeSelect: React.FC<SelectExProps<ListMode>> = (props) => {
  const {
    listMode, setListMode,
  } = useListMode()

  return (
    <SelectEx<ListMode>
      value={(listMode ?? 'default') as ListMode}
      onChange={(event) => {
        setListMode?.(event.target.value as ListMode)
      }}
      {...props}
    >
      <MenuItem key="default" value="default">
        Default
      </MenuItem>
      <MenuItem key="table" value="table">
        Table
      </MenuItem>
      <MenuItem key="grid" value="grid">
        Grid
      </MenuItem>
    </SelectEx>
  )
}

export const ListModeSelectFormControl: React.FC<SelectExProps<ListMode>> = (props) => {
  return (
    <EmbedFormControl formId={listModeSelectId} formLabel={listModeSelectLabel}>
      <ListModeSelect size="small" label={listModeSelectLabel} labelId={listModeSelectId} {...props} />
    </EmbedFormControl>
  )
}
