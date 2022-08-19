import { MenuItem, Select, SelectProps } from '@mui/material'
import { ListMode, useListMode } from '@xyo-network/react-shared'

import { EmbedFormControl } from './EmbedFormControl'

const listModeSelectId = 'listmode-select-id'
const listModeSelectLabel = 'List Mode'

export const ListModeSelect: React.FC<SelectProps<ListMode>> = (props) => {
  const { listMode, setListMode } = useListMode()

  return (
    <Select<ListMode>
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
    </Select>
  )
}

export const ListModeSelectFormControl: React.FC<SelectProps<ListMode>> = (props) => {
  return (
    <EmbedFormControl formId={listModeSelectId} formLabel={listModeSelectLabel}>
      <ListModeSelect size="small" label={listModeSelectLabel} labelId={listModeSelectId} {...props} />
    </EmbedFormControl>
  )
}
