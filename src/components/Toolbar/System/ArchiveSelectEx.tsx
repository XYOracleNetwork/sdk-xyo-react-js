import { Error } from '@mui/icons-material'
import { MenuItem } from '@mui/material'
import { SelectEx, SelectExProps, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { useAppSettings, useArchive, useArchivistApi } from '../../../contexts'
import { AxiosErrorHandler } from '../../Auth'

export const ArchiveSelectEx: React.FC<SelectExProps<string>> = ({ onChange, ...props }) => {
  const { darkMode } = useAppSettings()
  const [archives, setArchives] = useState<string[]>()
  const [apiError, setApiError] = useState<AxiosError>()
  const { archive = 'temp', setArchive } = useArchive()

  const { api } = useArchivistApi()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const loadedArchives = (await api?.archives.get())?.map((response) => response.archive) ?? ['temp']
        if (mounted()) {
          if (archive && !loadedArchives.find((item) => item === archive)) {
            loadedArchives.push(archive)
          }
          setArchives(loadedArchives)
          setApiError(undefined)
        }
      } catch (e) {
        setApiError(e as AxiosError)
      }
    },
    [api, archive]
  )

  return (
    <AxiosErrorHandler
      apiError={apiError}
      loginForm={false}
      displayError={false}
      customError={<Error color="warning" />}
    >
      {archives ? (
        <SelectEx
          colorize="primary"
          mode={darkMode ? 'dark' : 'light'}
          variant="outlined"
          size="small"
          value={archive}
          onChange={(event, child) => {
            setArchive?.(event.target.value)
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
      ) : null}
    </AxiosErrorHandler>
  )
}
