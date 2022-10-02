import { XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoModuleResolverFunc } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type RemoteArchivistProviderProps = ContextExProviderProps<{
  config: XyoRemoteArchivistConfig
  resolver?: XyoModuleResolverFunc
}>

export const RemoteArchivistProvider: React.FC<RemoteArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const activeResolver: XyoModuleResolverFunc = (address: string) => {
    if (archivist && address === archivist?.address) {
      return new XyoArchivistWrapper(archivist)
    }
    return resolver?.(address) ?? null
  }
  return (
    <ArchivistProvider
      archivist={
        new XyoRemoteArchivist(
          merge(
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
          undefined,
          activeResolver,
        )
      }
      {...props}
    />
  )
}
