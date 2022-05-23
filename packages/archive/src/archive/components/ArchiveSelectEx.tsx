import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/sdk-react'

import { useArchives } from '../../archives'
import { useArchive } from '../contexts'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { archives } = useArchives()
  const { archive, setArchive } = useArchive()

  const archivesList = [...(archives?.map((archive) => archive.archive) ?? [])]

  if (archive && !archives?.find((value) => value.archive === archive)) {
    archivesList.push(archive)
  }

  return (
    <SelectEx
      variant="outlined"
      size="small"
      value={archive ?? ''}
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
