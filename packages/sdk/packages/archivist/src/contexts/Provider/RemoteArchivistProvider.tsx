import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type RemoteArchivistProviderProps = ContextExProviderProps<{
  config: XyoRemoteArchivistConfig
}>

export const RemoteArchivistProvider: React.FC<RemoteArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoRemoteArchivist(
          merge(
            {},
            config,
            archivist
              ? {
                  parents: {
                    commit: {
                      [archivist.address]: archivist,
                    },
                    read: {
                      [archivist.address]: archivist,
                    },
                    write: {
                      [archivist.address]: archivist,
                    },
                  },
                }
              : undefined,
          ),
        )
      }
      {...props}
    />
  )
}
