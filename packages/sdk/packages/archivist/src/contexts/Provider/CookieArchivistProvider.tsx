import { XyoCookieArchivist, XyoCookieArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolverFunc } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type CookieArchivistProviderProps = ContextExProviderProps<{
  config: XyoCookieArchivistConfig
  resolver?: XyoModuleResolverFunc
}>

export const CookieArchivistProvider: React.FC<CookieArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  return (
    <ArchivistProvider
      archivist={
        new XyoCookieArchivist(
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
          undefined,
          resolver,
        )
      }
      {...props}
    />
  )
}
