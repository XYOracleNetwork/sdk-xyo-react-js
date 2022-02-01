import {
  XyoAddress,
  XyoArchivistApi,
  XyoArchivistApiConfig,
  XyoPanel,
  XyoSystemInfoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'

export const XyoPanelLoader: React.FC = ({ children }) => {
  const [panel, setPanel] = useState<XyoPanel>()

  useEffect(() => {
    const archivistConfigs: XyoArchivistApiConfig[] = [
      {
        apiDomain: process.env.API_DOMAIN || 'https://api.archivist.xyo.network',
        archive: 'test',
      },
    ]

    const archivists = archivistConfigs.map((config) => {
      return XyoArchivistApi.get(config)
    })
    const witnesses = [new XyoSystemInfoWitness()]

    const panel = new XyoPanel({ address: XyoAddress.fromPhrase('test'), archivists, witnesses })
    setPanel(panel)
  }, [])

  return <XyoPanelContext.Provider value={{ panel }}>{panel ? children : null}</XyoPanelContext.Provider>
}
