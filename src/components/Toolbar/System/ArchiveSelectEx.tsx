import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { useAppSettings, useArchivistApi } from '../../../contexts'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { changeArchive, archive, darkMode } = useAppSettings()
  const [archives, setArchives] = useState<string[]>()
  const [, setApiError] = useState<AxiosError>()

  const { api } = useArchivistApi()

  useAsyncEffect(
    async (mounted) => {
      if (api) {
        try {
          const loadedArchives = (await api.getArchives()).map((response) => response.archive)
          if (mounted()) {
            if (archive && !loadedArchives.find((item) => item === archive)) {
              loadedArchives.push(archive)
            }
            setArchives(loadedArchives)
          }
        } catch (e) {
          setApiError(e as AxiosError)
        }
      }
    },
    [api]
  )

  return archives ? (
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
  ) : null
}
