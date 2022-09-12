import { XyoMemoryArchivist, XyoMemoryArchivistConfig } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type MemoryArchivistProviderProps = ContextExProviderProps<{
  config: XyoMemoryArchivistConfig
}>

export const MemoryArchivistProvider: React.FC<MemoryArchivistProviderProps> = ({ config, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoMemoryArchivist(
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
