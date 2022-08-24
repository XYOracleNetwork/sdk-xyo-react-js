import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { assertEx, delay } from '@xylabs/sdk-js'
import { XyoApiConfig, XyoArchivistApi } from '@xyo-network/api'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPanel } from '@xyo-network/panel'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useAccount } from '@xyo-network/react-wallet'
import { XyoWitness } from '@xyo-network/witness'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'
import { XyoPanelReportProgress, XyoReportStatus } from './State'

export interface XyoPanelProviderProps {
  archivists?: XyoArchivistApi[]
  inlinePayloads?: boolean
  witnesses?: XyoWitness<XyoPayload>[]
  required?: boolean
  archive?: string
}

const getDefaultArchivists = () => {
  const archivistConfigs: XyoApiConfig[] = [
    {
      apiDomain: process.env.API_DOMAIN || 'https://api.archivist.xyo.network',
    },
  ]

  return archivistConfigs.map((config) => {
    return new XyoArchivistApi(config)
  })
}

export const XyoPanelProvider: React.FC<WithChildren<XyoPanelProviderProps>> = ({
  inlinePayloads = false,
  required = false,
  archivists = getDefaultArchivists(),
  witnesses = [],
  children,
}) => {
  const { archive } = useArchive()
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<XyoPanelReportProgress>({})
  const [status, setStatus] = useState(XyoReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const { account } = useAccount()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const panel = new XyoPanel({
        account,
        archive,
        archivists,
        inlinePayloads,
        onArchivistSendEnd: (archivist: XyoArchivistApi, error?: Error) => {
          const archivists = progress.archivists ?? {}
          archivists[archivist.config.apiDomain] = {
            archivist,
            status: error ? XyoReportStatus.Failed : XyoReportStatus.Succeeded,
          }
          if (mounted()) {
            setProgress({ archivists, witnesses: progress.witnesses })
          }
        },
        onArchivistSendStart: (archivist: XyoArchivistApi) => {
          const archivists = progress.archivists ?? {}
          archivists[archivist.config.apiDomain] = {
            archivist,
            status: XyoReportStatus.Started,
          }
          if (mounted()) {
            setProgress({ archivists, witnesses: progress.witnesses })
          }
        },
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
            setProgress({
              archivists: progress.archivists,
              witnesses: progress.witnesses,
            })
            setStatus(errors ? XyoReportStatus.Failed : XyoReportStatus.Succeeded)
            setReportingErrors(errors)
          }
        },
        onReportStart: () => {
          if (mounted()) {
            setProgress({ archivists: {}, witnesses: {} })
            setStatus(XyoReportStatus.Started)
          }
        },
        onWitnessReportEnd: (witness: XyoWitness, error?: Error) => {
          const witnesses = progress.witnesses ?? {}
          witnesses[witness.address] = {
            status: error ? XyoReportStatus.Failed : XyoReportStatus.Succeeded,
            witness,
          }
          if (mounted()) {
            setProgress({
              archivists: progress.archivists,
              witnesses,
            })
          }
        },
        onWitnessReportStart: (witness: XyoWitness) => {
          const witnesses = progress.witnesses ?? {}
          witnesses[witness.address] = {
            status: XyoReportStatus.Started,
            witness,
          }
          if (mounted()) {
            setProgress({
              archivists: progress.archivists,
              witnesses,
            })
          }
        },
        witnesses: witnesses.filter((witness) => !!witness),
      })
      setPanel(panel)
      await delay(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archive, archivists, witnesses],
  )

  useEffect(() => {
    setHistory(panel?.history)
  }, [panel])

  return (
    <XyoPanelContext.Provider value={{ history, panel, progress, provided: true, reportingErrors, status }}>
      {panel ? children : required ? null : children}
    </XyoPanelContext.Provider>
  )
}
