import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useAppSettings, useArchive } from '../../../contexts'
import { useArchives } from '../../../hooks'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { darkMode } = useAppSettings()
  const archives = useArchives()
  const { archive = 'temp', setArchive } = useArchive()

  return (
    <SelectEx
      colorize="primary"
      mode={darkMode ? 'dark' : 'light'}
      variant="outlined"
      size="small"
      value={archive}
      onChange={(event, child) => {
        if (event.target.value !== archive) {
          setArchive?.(event.target.value)
          onChange?.(event, child)
        }
      }}
      {...props}
    >
      {(archives ?? ['temp']).map((archive) => {
        return (
          <MenuItem key={archive} value={archive}>
            {archive}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
