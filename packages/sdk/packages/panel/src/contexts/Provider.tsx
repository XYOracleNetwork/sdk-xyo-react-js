import { delay } from '@xylabs/delay'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { AbstractArchivist, ArchivistWrapper } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { CompositeModuleResolver } from '@xyo-network/module'
import { XyoPanel, XyoPanelConfig, XyoPanelConfigSchema } from '@xyo-network/panel'
import { AbstractWitness, WitnessWrapper } from '@xyo-network/witness'
import { useEffect, useMemo, useState } from 'react'

import { PanelContext } from './Context'
import { PanelReportProgress, ReportStatus } from './State'

export interface PanelProviderProps {
  /** Account used by the panel for signing */
  account?: Account
  /** @deprecated - panel no longer uses archive but relies on an archivist */
  archive?: string
  archivist?: AbstractArchivist
  name?: string
  required?: boolean
  witnesses?: AbstractWitness[]
}

export const PanelProvider: React.FC<WithChildren<PanelProviderProps>> = ({
  account,
  archivist,
  children,
  name,
  witnesses = [],
  required = false,
}) => {
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<PanelReportProgress>({})
  const [status, setStatus] = useState(ReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const resolver = useMemo(() => {
    const resolver = new CompositeModuleResolver().add(witnesses)
    return archivist ? resolver.add(archivist) : resolver
  }, [archivist, witnesses])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const archivistWrapper = archivist ? new ArchivistWrapper(archivist) : undefined
      const panel = await XyoPanel.create({
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
          schema: XyoPanelConfigSchema,
          witnesses: witnesses.map((witness) => witness.address),
        } as XyoPanelConfig,
        resolver,
      })
      setPanel(panel)
      await delay(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archivist, witnesses],
  )

  useEffect(() => {
    setHistory(panel?.history as XyoBoundWitness[])
  }, [panel])

  return !required || panel ? (
    <PanelContext.Provider value={{ history, panel, progress, provided: true, reportingErrors, status }}>{children}</PanelContext.Provider>
  ) : null
}
