import { useMounted } from '@xylabs/sdk-react'
import {
  XyoAddress,
  XyoArchivistApi,
  XyoArchivistApiConfig,
  XyoBoundWitness,
  XyoPanel,
  XyoSystemInfoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'

export interface XyoPanelLoaderProps {
  address?: XyoAddress
  archivists?: XyoArchivistApi[]
}

const getDefaultArchivists = () => {
  const archivistConfigs: XyoArchivistApiConfig[] = [
    {
      apiDomain: process.env.API_DOMAIN || 'https://api.archivist.xyo.network',
      archive: 'temp',
    },
  ]

  return archivistConfigs.map((config) => {
    return XyoArchivistApi.get(config)
  })
}

export const XyoPanelLoader: React.FC<XyoPanelLoaderProps> = ({
  address = XyoAddress.random(),
  archivists = getDefaultArchivists(),
  children,
}) => {
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const mounted = useMounted()

  useEffect(() => {
    const witnesses = [new XyoSystemInfoWitness()]

    //touches history to trigger hook reload
    const onHistoryAdd = () => {
      if (mounted()) {
        setHistory(panel?.history)
      }
    }

    //touches history to trigger hook reload
    const onHistoryRemove = () => {
      if (mounted()) {
        setHistory(panel?.history)
      }
    }

    const panel = new XyoPanel({ address, archivists, onHistoryAdd, onHistoryRemove, witnesses })
    setPanel(panel)
    setHistory(panel.history)
  }, [address, archivists, mounted])

  return <XyoPanelContext.Provider value={{ history, panel }}>{panel ? children : null}</XyoPanelContext.Provider>
}
