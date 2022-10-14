import { XyoArchivistWrapper, XyoMemoryArchivist, XyoMemoryArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config?: XyoMemoryArchivistConfig
  resolver?: XyoModuleResolver
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const activeResolver = resolver ?? new XyoModuleResolver().add(archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined)
  return (
    <ArchivistProvider
      archivist={
        new XyoMemoryArchivist({
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
