import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper, XyoMemoryArchivist, XyoMemoryArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useMemo, useState } from 'react'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config?: XyoMemoryArchivistConfig
  resolver?: XyoModuleResolver
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const wrapper = useMemo(() => (archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined), [archivist])
  const activeResolver: XyoModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new XyoModuleResolver() : undefined),
    [resolver, wrapper],
  )
  if (archivist) {
    activeResolver?.add(new XyoArchivistWrapper({ module: archivist }))
  }

  const [activeArchivist, setActiveArchivist] = useState<XyoMemoryArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = await XyoMemoryArchivist.create({
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
