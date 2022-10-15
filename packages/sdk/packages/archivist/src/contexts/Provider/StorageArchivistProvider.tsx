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

import { useAsyncEffect } from '@xylabs/react-shared'
import { useMemo, useState } from 'react'

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const wrapper = useMemo(() => (archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined), [archivist])
  const activeResolver: XyoModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new XyoModuleResolver() : undefined),
    [resolver, wrapper],
  )
  if (archivist) {
    activeResolver?.add(new XyoArchivistWrapper({ module: archivist }))
  }

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
        resolver: activeResolver,
      }).start()
      if (mounted()) {
        setActiveArchivist(activeArchivist)
      }
    },
    [activeResolver, archivist, config],
  )

  return <ArchivistProvider archivist={activeArchivist} {...props} />
}
