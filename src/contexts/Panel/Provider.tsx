import { assertEx } from '@xylabs/sdk-js'
import { useMounted } from '@xylabs/sdk-react'
import {
  XyoAddress,
  XyoArchivistApi,
  XyoArchivistApiConfig,
  XyoBoundWitness,
  XyoPanel,
  XyoPayload,
  XyoSystemInfoWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'

export interface XyoPanelProviderProps {
  address?: XyoAddress
  archivists?: XyoArchivistApi[]
  inlinePayloads?: boolean
  witnesses?: XyoWitness<XyoPayload>[]
}

const getDefaultArchivists = () => {
  const archivistConfigs: XyoArchivistApiConfig[] = [
    {
      apiDomain: process.env.API_DOMAIN || 'https://api.archivist.xyo.network',
      archive: 'temp',
    },
  ]

  return archivistConfigs.map((config) => {
    return new XyoArchivistApi(config)
  })
}

export const XyoPanelProvider: React.FC<XyoPanelProviderProps> = ({
  inlinePayloads = false,
  address = XyoAddress.random(),
  archivists = getDefaultArchivists(),
  witnesses = [new XyoSystemInfoWitness()],
  children,
}) => {
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [busyReporting, setBusyReporting] = useState(false)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const mounted = useMounted()

  useEffect(() => {
    const panel = new XyoPanel({
      address,
      archivists,
      inlinePayloads,
      onHistoryAdd: () => {
        if (mounted()) {
          setHistory(assertEx(panel).history.map((item) => item))
        }
      },
      onHistoryRemove: () => {
        if (mounted()) {
          setHistory(assertEx(panel).history.map((item) => item))
        }
      },
      onReportEnd: (_, errors?: Error[]) => {
        if (mounted()) {
          setBusyReporting(false)
          setReportingErrors(errors)
        }
      },
      onReportStart: () => {
        if (mounted()) {
          setBusyReporting(true)
        }
      },
      witnesses,
    })
    setPanel(panel)
  }, [address, archivists, witnesses, panel, inlinePayloads, mounted])

  useEffect(() => {
    setHistory(panel?.history)
  }, [panel])

  return (
    <XyoPanelContext.Provider value={{ busyReporting, history, panel, reportingErrors }}>
      {panel ? children : null}
    </XyoPanelContext.Provider>
  )
}
