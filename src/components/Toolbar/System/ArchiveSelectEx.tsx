import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useAppSettings, useArchive, useArchives } from '../../../contexts'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { darkMode } = useAppSettings()
  const { archives } = useArchives()
  const { archive, setArchive } = useArchive()

  const archivesList = [...(archives?.map((archive) => archive.archive) ?? [])]

  if (archive && !archives?.find((value) => value.archive === archive)) {
    archivesList.push(archive)
  }

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
      {archivesList.map((archive) => {
        return (
          <MenuItem key={archive} value={archive}>
            {archive}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
