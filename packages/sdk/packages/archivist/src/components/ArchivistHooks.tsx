import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { XyoPayload } from '@xyo-network/payload'
import { ArchivistApiProvider, useArchivistApi } from '@xyo-network/react-archivist-api'

import { RemoteArchivistProvider } from '../contexts'

const WithArchivist: React.FC<WithChildren> = ({ children }) => {
  return <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">{children}</ArchivistApiProvider>
}

const WithRemoteArchivist: React.FC<WithChildren> = ({ children }) => {
  const { api } = useArchivistApi()
  return (
    <RemoteArchivistProvider config={{ api: api, archive: 'temp', schema: 'network.xyo.archivist.remote.config' }}>
      {children}
    </RemoteArchivistProvider>
  )
}

export const WithArchivistProviders: DecoratorFn = (Story, args) => {
  return (
    <WithArchivist>
      <WithRemoteArchivist>
        <Story {...args} />
      </WithRemoteArchivist>
    </WithArchivist>
  )
}

export interface ArchivistPayloadsProps {
  refresh?: () => void
  payloads?: (XyoPayload | null)[]
  error?: Error
}

export const ArchivistPayloads: React.FC<ArchivistPayloadsProps> = ({ refresh, payloads, error }) => {
  return (
    <FlexCol rowGap={2}>
      <Button variant="contained" onClick={() => refresh?.()}>
        Refresh
      </Button>
      <Card>
        <CardHeader title="Payloads" />
        <CardContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{payloads ? JSON.stringify(payloads, null, 2) : null}</pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Errors" />
        <CardContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{error ? JSON.stringify(error, null, 2) : null}</pre>
        </CardContent>
      </Card>
    </FlexCol>
  )
}
