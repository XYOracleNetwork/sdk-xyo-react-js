import { useAsyncEffect } from '@xylabs/react-shared'
import { MemoryArchivist, MemoryArchivistConfig } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useState } from 'react'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config?: MemoryArchivistConfig
  node?: MemoryNode
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config, node, ...props }) => {
  const { archivist } = useArchivist()

  const [activeArchivist, setActiveArchivist] = useState<MemoryArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = await MemoryArchivist.create({
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
      })
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
