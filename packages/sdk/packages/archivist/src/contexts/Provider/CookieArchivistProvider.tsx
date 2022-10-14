import { XyoArchivistWrapper, XyoCookieArchivist, XyoCookieArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import merge from 'lodash/merge'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type CookieArchivistProviderProps = ContextExProviderProps<{
  config: XyoCookieArchivistConfig
  resolver?: XyoModuleResolver
}>

export const CookieArchivistProvider: React.FC<CookieArchivistProviderProps> = ({ config, resolver, ...props }) => {
  const { archivist } = useArchivist()
  const wrapper = archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined
  const activeResolver: XyoModuleResolver | undefined = resolver ?? wrapper ? new XyoModuleResolver() : undefined
  if (archivist) {
    activeResolver?.add(new XyoArchivistWrapper({ module: archivist }))
  }
  return (
    <ArchivistProvider
      archivist={
        new XyoCookieArchivist({
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
