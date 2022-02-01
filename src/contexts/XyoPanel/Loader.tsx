import {
  XyoAddress,
  XyoArchivistApi,
  XyoArchivistApiConfig,
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

  useEffect(() => {
    const witnesses = [new XyoSystemInfoWitness()]

    const panel = new XyoPanel({ address, archivists, witnesses })
    setPanel(panel)
  }, [address, archivists])

  return <XyoPanelContext.Provider value={{ panel }}>{panel ? children : null}</XyoPanelContext.Provider>
}
