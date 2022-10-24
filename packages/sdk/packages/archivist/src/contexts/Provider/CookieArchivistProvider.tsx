import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper, XyoCookieArchivist, XyoCookieArchivistConfig } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useMemo, useState } from 'react'

import { useArchivist } from '../use'
import { ArchivistProvider } from './Provider'

export type CookieArchivistProviderProps = ContextExProviderProps<{
  config: XyoCookieArchivistConfig
  resolver?: XyoModuleResolver
}>

export const CookieArchivistProvider: React.FC<CookieArchivistProviderProps> = ({ config: configProp, resolver, ...props }) => {
  const [config, setConfig] = useDataState(configProp)
  const { archivist } = useArchivist()

  //we set this every time, but it will only take if config VALUE changed
  setConfig(config)

  const wrapper = useMemo(() => (archivist ? new XyoArchivistWrapper(archivist) : undefined), [archivist])
  const activeResolver: XyoModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new XyoModuleResolver() : undefined),
    [resolver, wrapper],
  )
  if (archivist) {
    activeResolver?.add(new XyoArchivistWrapper(archivist))
  }

  const [activeArchivist, setActiveArchivist] = useState<XyoCookieArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = await XyoCookieArchivist.create({
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
