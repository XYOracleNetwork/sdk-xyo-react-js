import { useAsyncEffect } from '@xylabs/react-shared'
import { CookieArchivist, CookieArchivistConfig } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useState } from 'react'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type CookieArchivistProviderProps = ContextExProviderProps<{
  config: CookieArchivistConfig
  node?: MemoryNode
}>

export const CookieArchivistProvider: React.FC<CookieArchivistProviderProps> = ({ config, node, ...props }) => {
  const { archivist } = useArchivist()

  const [activeArchivist, setActiveArchivist] = useState<CookieArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = await CookieArchivist.create({
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
