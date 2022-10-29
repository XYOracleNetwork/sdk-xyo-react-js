import { DecoratorFn } from '@storybook/react'
import { WithChildren } from '@xylabs/react-shared'
import { ApiProvider, RemoteArchivistProvider, useApi } from '@xyo-network/react-api'

const WithArchivist: React.FC<WithChildren> = ({ children }) => {
  return <ApiProvider apiDomain="https://beta.api.archivist.xyo.network">{children}</ApiProvider>
}

const WithRemoteArchivist: React.FC<WithChildren> = ({ children }) => {
  const { api } = useApi()
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
