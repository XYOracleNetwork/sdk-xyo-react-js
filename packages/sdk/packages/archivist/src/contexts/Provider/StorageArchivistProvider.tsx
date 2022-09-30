import { XyoArchivistWrapper, XyoStorageArchivist, XyoStorageArchivistConfig } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type StorageArchivistProviderProps = ContextExProviderProps<{
  config: XyoStorageArchivistConfig
}>

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
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
                      [archivist.address]: wrapper,
                    },
                    read: {
                      [archivist.address]: wrapper,
                    },
                    write: {
                      [archivist.address]: wrapper,
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
