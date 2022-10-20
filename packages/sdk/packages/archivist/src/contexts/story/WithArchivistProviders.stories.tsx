import { DecoratorFn } from '@storybook/react'
import { WithChildren } from '@xylabs/react-shared'
import { ArchivistApiProvider, useArchivistApi } from '@xyo-network/react-archivist-api'

import { RemoteArchivistProvider } from '..'

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
