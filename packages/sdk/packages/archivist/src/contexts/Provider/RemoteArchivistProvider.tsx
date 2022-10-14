import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type RemoteArchivistProviderProps = ContextExProviderProps<{
  config: XyoRemoteArchivistConfig
  resolver?: XyoModuleResolver
}>

export const RemoteArchivistProvider: React.FC<RemoteArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const activeResolver = resolver ?? new XyoModuleResolver().add(archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined)
  return (
    <ArchivistProvider
      archivist={
        new XyoRemoteArchivist({
          config: merge(
            {},
            config,
            archivist
              ? {
                  parents: {
                    commit: [archivist.address],
                    read: [archivist.address],
                    write: [archivist.address],
                  },
                }
              : undefined,
          ),
          resolver: activeResolver,
        })
      }
      {...props}
    />
  )
}
