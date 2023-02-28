import { StorageArchivistConfig, XyoStorageArchivist } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type StorageArchivistProviderProps = ContextExProviderProps<{
  config: StorageArchivistConfig
  node?: MemoryNode
}>

import { useAsyncEffect } from '@xylabs/react-shared'
import { useState } from 'react'

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config, node, ...props }) => {
  const { archivist } = useArchivist()

  const [activeArchivist, setActiveArchivist] = useState<XyoStorageArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = await new XyoStorageArchivist({
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
      }).start()
      await node?.register(activeArchivist).attach(activeArchivist.address)
      if (mounted()) {
        setActiveArchivist(activeArchivist)
      }
      return () => {
        node?.detach(activeArchivist.address)
        node?.unregister(activeArchivist)
      }
    },
    [node, archivist, config],
  )

  return <ArchivistProvider archivist={activeArchivist} {...props} />
}
