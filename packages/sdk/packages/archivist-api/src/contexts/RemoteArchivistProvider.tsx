import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistApi, XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoModuleResolver } from '@xyo-network/module'
import { ArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useMemo, useState } from 'react'

export type RemoteArchivistProviderProps = ContextExProviderProps<{
  config?: XyoRemoteArchivistConfig
  resolver?: XyoModuleResolver
  api?: XyoArchivistApi
}>

export const RemoteArchivistProvider: React.FC<RemoteArchivistProviderProps> = ({ config: configProp, api, resolver, ...props }) => {
  const [config, setConfig] = useDataState(configProp)
  const { archivist } = useArchivist()

  //we set this every time, but it will only take if config VALUE changed
  setConfig(config)

  const wrapper = useMemo(() => (archivist ? new XyoArchivistWrapper(archivist) : undefined), [archivist])
  const activeResolver: XyoModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new XyoModuleResolver() : undefined),
    [resolver, wrapper],
  )

  // eslint-disable-next-line deprecation/deprecation
  const activeApi = api ?? config?.api

  if (archivist) {
    activeResolver?.add(new XyoArchivistWrapper(archivist))
  }

  const [activeArchivist, setActiveArchivist] = useState<XyoRemoteArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = activeApi
        ? await XyoRemoteArchivist.create({
            api: activeApi,
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
        : undefined
      if (mounted()) {
        setActiveArchivist(activeArchivist)
      }
    },
    [activeResolver, archivist, config, activeApi],
  )

  return <ArchivistProvider archivist={activeArchivist} {...props} />
}