import { MenuItem, Select, SelectProps } from '@mui/material'
import { ListMode, useListMode } from '@xyo-network/react-shared'

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
