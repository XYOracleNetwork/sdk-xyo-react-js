import { XyoArchivistWrapper, XyoStorageArchivist, XyoStorageArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type StorageArchivistProviderProps = ContextExProviderProps<{
  config: XyoStorageArchivistConfig
  resolver?: XyoModuleResolver
}>

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const activeResolver = resolver ?? new XyoModuleResolver().add(archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined)

  return (
    <ArchivistProvider
      archivist={
        new XyoStorageArchivist({
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
