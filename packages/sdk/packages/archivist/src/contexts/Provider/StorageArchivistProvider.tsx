import { ArchivistWrapper, StorageArchivistConfig, XyoStorageArchivist } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type StorageArchivistProviderProps = ContextExProviderProps<{
  config: StorageArchivistConfig
  resolver?: XyoModuleResolver
}>

import { useAsyncEffect } from '@xylabs/react-shared'
import { useMemo, useState } from 'react'

export const StorageArchivistProvider: React.FC<StorageArchivistProviderProps> = ({ config: configProp, resolver, ...props }) => {
  const [config, setConfig] = useDataState(configProp)
  const { archivist } = useArchivist()

  //we set this every time, but it will only take if config VALUE changed
  setConfig(configProp)

  const wrapper = useMemo(() => (archivist ? new ArchivistWrapper(archivist) : undefined), [archivist])
  const activeResolver: XyoModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new XyoModuleResolver() : undefined),
    [resolver, wrapper],
  )
  if (archivist) {
    activeResolver?.add(new ArchivistWrapper(archivist))
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
