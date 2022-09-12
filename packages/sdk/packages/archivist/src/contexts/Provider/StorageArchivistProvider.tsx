import { XyoStorageArchivist, XyoStorageArchivistConfig } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type StorageArchivistProviderProps = ContextExProviderProps<{
  config: XyoStorageArchivistConfig
}>

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoStorageArchivist(
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
