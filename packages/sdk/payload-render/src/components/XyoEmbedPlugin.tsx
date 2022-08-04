import { Alert, AlertTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ListModeProvider } from '@xyo-network/react-shared'
import { ResultLoader } from '@xyo-network/react-webapp'
import { useState } from 'react'

import { ListModeSelect } from './ListModeSelect'
import { RenderComponent } from './RenderComponent'
import { XyoEmbedPluginProps } from './XyoEmbedPluginProps'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

const listModeSelectId = 'listmode-select-id'
const listModeSelectLabel = 'List Mode'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({ plugins = [], huri, ...props }) => {
  const [payload, setPayload] = useState<XyoPayload>()
  const [notFound, setNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()
  const [ActivePlugin, setActivePlugin] = useState<XyoPayloadRenderPlugin>(plugins[0])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!payload && huri) {
        try {
          const huriInstance = new Huri(huri)
          const result = await huriInstance.fetch()

          if (mounted()) {
            if (result === null) setNotFound(true)
            if (payload === undefined) setPayload(result)
          }
        } catch (e) {
          setHuriApiError(e as XyoApiError)
        }
      }
    },
    [huri, payload]
  )

  if (payload && plugins?.length === 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>Missing plugins!</AlertTitle>Payload found but no plugins were present.
      </Alert>
    )
  }

  return (
    <ListModeProvider>
      <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
        <XyoApiErrorRender apiError={huriApiError} rowGap={2} {...props}>
          <FormControl>
            <InputLabel id={renderSelectId}>{renderSelectLabel}</InputLabel>
            <Select size="small" value={ActivePlugin.name} label={renderSelectLabel} labelId={renderSelectId}>
              {plugins?.map((plugin) => (
                <MenuItem value={plugin.name} key={plugin.name} onClick={() => setActivePlugin(plugin)}>
                  {plugin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(ActivePlugin?.components?.box?.listModes?.length ?? 0) > 1 ? (
            <FormControl sx={{ mb: 2 }}>
              <InputLabel id={listModeSelectId}>{listModeSelectLabel}</InputLabel>
              <ListModeSelect size="small" label={listModeSelectLabel} labelId={listModeSelectId} />
            </FormControl>
          ) : null}
          <RenderComponent payload={payload} ActivePlugin={ActivePlugin} />
        </XyoApiErrorRender>
      </ResultLoader>
    </ListModeProvider>
  )
}
