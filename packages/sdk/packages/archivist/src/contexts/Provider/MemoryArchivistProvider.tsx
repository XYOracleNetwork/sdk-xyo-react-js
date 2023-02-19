import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper, MemoryArchivist, MemoryArchivistConfig } from '@xyo-network/archivist'
import { CompositeModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useMemo, useState } from 'react'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config?: MemoryArchivistConfig
  resolver?: CompositeModuleResolver
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config: configProp, resolver, ...props }) => {
  const [config, setConfig] = useDataState(configProp)
  const { archivist } = useArchivist()

  //we set this every time, but it will only take if config VALUE changed
  setConfig(configProp)

  const wrapper = useMemo(() => (archivist ? new ArchivistWrapper(archivist) : undefined), [archivist])
  const activeResolver: CompositeModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new CompositeModuleResolver() : undefined),
    [resolver, wrapper],
  )
  if (archivist) {
    activeResolver?.add(archivist)
  }

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
        resolver: activeResolver,
      })
      if (mounted()) {
        setActiveArchivist(activeArchivist)
      }
    },
    [activeResolver, archivist, config],
  )

  return <ArchivistProvider archivist={activeArchivist} {...props} />
}
