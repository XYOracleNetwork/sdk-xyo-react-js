import { assertEx, delay } from '@xylabs/sdk-js'
import { useAsyncEffect } from '@xylabs/sdk-react'
import {
  XyoAddress,
  XyoApiConfig,
  XyoArchivistApi,
  XyoBoundWitness,
  XyoPanel,
  XyoPayload,
  XyoSystemInfoWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { useArchive } from '../Archive'
import { XyoPanelContext, XyoPanelReportProgress, XyoReportStatus } from './Context'

export interface XyoPanelProviderProps {
  address?: XyoAddress
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

export const XyoPanelProvider: React.FC<XyoPanelProviderProps> = ({
  inlinePayloads = false,
  required = false,
  address = XyoAddress.random(),
  archivists = getDefaultArchivists(),
  witnesses = [new XyoSystemInfoWitness()],
  archive,
  children,
}) => {
  const { archive: contextArchive } = useArchive()
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<XyoPanelReportProgress>({})
  const [status, setStatus] = useState(XyoReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const panel = new XyoPanel({
        address,
        archive: archive ?? contextArchive,
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
          witnesses[witness.config.schema] = {
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
          witnesses[witness.config.schema] = {
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
    [address, archivists, witnesses, inlinePayloads, archive, contextArchive]
  )

  useEffect(() => {
    setHistory(panel?.history)
  }, [panel])

  return (
    <XyoPanelContext.Provider value={{ history, panel, progress, reportingErrors, status }}>
      {panel ? children : required ? null : children}
    </XyoPanelContext.Provider>
  )
}
