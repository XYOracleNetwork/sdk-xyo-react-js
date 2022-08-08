import RefreshIcon from '@mui/icons-material/Refresh'
import { Alert, AlertTitle, Avatar, Card, CardContent, CardHeader, Link, Theme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ListModeProvider, TypographyEx } from '@xyo-network/react-shared'
import { ResultLoader } from '@xyo-network/react-webapp'
import { Fragment, useState } from 'react'

import { EmbedControlWrap, EmbedRenderSelect } from './controls'
import { ListModeSelect } from './ListModeSelect'
import { RenderComponent } from './RenderComponent'
import { XyoEmbedPluginProps } from './XyoEmbedPluginProps'

const renderSelectId = 'render-select-id'
const renderSelectLabel = 'Renderer'

const listModeSelectId = 'listmode-select-id'
const listModeSelectLabel = 'List Mode'

export const XyoEmbedPlugin: React.FC<XyoEmbedPluginProps> = ({ plugins = [], huri, refreshTitle = '', timestampLabel = 'Data From', ...props }) => {
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

  const refreshHuri = () => {
    setHuriApiError(undefined)
    setNotFound(undefined)
    setPayload(undefined)
  }

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
          <Card elevation={3}>
            <CardHeader
              sx={{ flexWrap: 'wrap', rowGap: 1 }}
              avatar={
                <Avatar sx={{ bgcolor: (theme: Theme) => theme.palette.primary.main }} aria-label={ActivePlugin?.name}>
                  {ActivePlugin?.name?.charAt(0)}
                </Avatar>
              }
              action={
                <Fragment>
                  {payload?.timestamp ? (
                    <FlexGrowRow>
                      <TypographyEx variant="caption">{`${timestampLabel} ${new Date(payload.timestamp).toLocaleString()}`}</TypographyEx>
                      <Link onClick={refreshHuri} sx={{ cursor: 'pointer' }} title={refreshTitle}>
                        <RefreshIcon sx={{ height: (theme: Theme) => theme.spacing(1), position: 'relative', top: '2px' }} />
                      </Link>
                    </FlexGrowRow>
                  ) : (
                    <></>
                  )}
                </Fragment>
              }
              title={ActivePlugin.name}
            />
            <FlexGrowRow columnGap={2} rowGap={2} flexWrap="wrap" justifyContent="start" pl={1}>
              {plugins.length > 1 ? (
                <EmbedControlWrap formId={renderSelectId} formLabel={renderSelectLabel}>
                  <EmbedRenderSelect
                    label={renderSelectLabel}
                    labelId={renderSelectId}
                    activePlugin={ActivePlugin}
                    plugins={plugins}
                    setActivePlugin={setActivePlugin}
                  />
                </EmbedControlWrap>
              ) : null}
              {(ActivePlugin?.components?.box?.listModes?.length ?? 0) > 1 ? (
                <EmbedControlWrap formId={listModeSelectId} formLabel={listModeSelectLabel}>
                  <ListModeSelect size="small" label={listModeSelectLabel} labelId={listModeSelectId} />
                </EmbedControlWrap>
              ) : null}
            </FlexGrowRow>
            <CardContent>
              <RenderComponent payload={payload} ActivePlugin={ActivePlugin} />
            </CardContent>
          </Card>
        </XyoApiErrorRender>
      </ResultLoader>
    </ListModeProvider>
  )
}
