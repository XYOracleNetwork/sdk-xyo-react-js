import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps, useAsyncEffect } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useAppSettings, useArchivistApi, useAuthState } from '../../../contexts'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { changeArchive, archive, darkMode } = useAppSettings()
  const [archives, setArchives] = useState<string[]>([])

  console.log(`archive: ${archive}`)

  const { state } = useAuthState()
  const { api } = useArchivistApi()

  useAsyncEffect(
    async (mounted) => {
      const myArchives = state?.loggedInAccount ? (await api?.getArchives()) ?? [] : []
      if (mounted()) {
        setArchives([...myArchives.map((value) => value.archive), 'temp'])
      }
    },
    [api]
  )

  return (
    <SelectEx
      colorize="primary"
      mode={darkMode ? 'dark' : 'light'}
      variant="outlined"
      size="small"
      value={archive}
      onChange={(event, child) => {
        changeArchive?.(event.target.value)
        onChange?.(event, child)
      }}
      {...props}
    >
      {archives.map((archive) => {
        return (
          <MenuItem key={archive} value={archive}>
            {archive}
          </MenuItem>
        )
      })}
    </SelectEx>
  )
}
