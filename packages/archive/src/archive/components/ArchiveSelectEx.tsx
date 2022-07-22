import { MenuItem, Theme, useMediaQuery } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/react-common'

import { useArchives } from '../../archives'
import { useArchive } from '../contexts'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { archives } = useArchives()
  const { archive, setArchive } = useArchive()
  const isMedium = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const archivesList = [...(archives?.map((archive) => archive.archive) ?? [])]

  if (archive && !archives?.find((value) => value.archive === archive)) {
    archivesList.push(archive)
  }

  return (
    <SelectEx
      variant="outlined"
      size="small"
      sx={{ maxWidth: isMedium ? '100px' : '300px' }}
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
