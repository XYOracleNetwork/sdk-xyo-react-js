/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { MemoryNode } from '@xyo-network/node'
import { AbstractSentinel, SentinelConfig, SentinelConfigSchema } from '@xyo-network/sentinel'
import { WitnessModule, WitnessWrapper } from '@xyo-network/witness'
import { useEffect, useState } from 'react'

import { PanelContext } from './Context'
import { PanelReportProgress, ReportStatus } from './State'

/** @deprecated - use sentinel package instead */
export interface PanelProviderProps {
  /** Account used by the panel for signing */
  account?: Account
  /** @deprecated - panel no longer uses archive but relies on an archivist */
  archive?: string
  archivist?: ArchivistModule
  name?: string
  node?: MemoryNode
  required?: boolean
  witnesses?: WitnessModule[]
}

export const PanelProvider: React.FC<WithChildren<PanelProviderProps>> = ({
  account,
  archivist,
  children,
  name,
  node,
  witnesses = [],
  required = false,
}) => {
  const [panel, setPanel] = useState<AbstractSentinel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<PanelReportProgress>({})
  const [status, setStatus] = useState(ReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const archivistWrapper = archivist ? new ArchivistWrapper(archivist) : undefined
      const panel = await AbstractSentinel.create({
        account,
        config: {
          archivists: archivistWrapper ? [archivistWrapper?.address] : undefined,
          name,
          onReportEnd: (_, errors?: Error[]) => {
            if (mounted()) {
              setProgress({
                archivists: progress.archivists,
                witnesses: progress.witnesses,
              })
              setStatus(errors ? ReportStatus.Failed : ReportStatus.Succeeded)
              setReportingErrors(errors)
            }
          },
          onReportStart: () => {
            if (mounted()) {
              setProgress({ archivists: {}, witnesses: {} })
              setStatus(ReportStatus.Started)
            }
          },
          onWitnessReportEnd: (witness: WitnessWrapper, error?: Error) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: error ? ReportStatus.Failed : ReportStatus.Succeeded,
              witness,
            }
            if (mounted()) {
              setProgress({
                archivists: progress.archivists,
                witnesses,
              })
            }
          },
          onWitnessReportStart: (witness: WitnessWrapper) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: ReportStatus.Started,
              witness,
            }
            if (mounted()) {
              setProgress({
                archivists: progress.archivists,
                witnesses,
              })
            }
          },
          schema: SentinelConfigSchema,
          witnesses: witnesses.map((witness) => witness.address),
        } as SentinelConfig,
      })
      await node?.register(panel).attach(panel.address)
      if (mounted()) {
        setPanel(panel)
      }
      return () => {
        if (panel) {
          node?.detach(panel?.address)
          node?.unregister(panel)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archivist, witnesses, node],
  )

  useEffect(() => {
    setHistory(panel?.history as XyoBoundWitness[])
  }, [panel])

  return !required || panel ? (
    <PanelContext.Provider value={{ history, panel, progress, provided: true, reportingErrors, status }}>{children}</PanelContext.Provider>
  ) : null
}
