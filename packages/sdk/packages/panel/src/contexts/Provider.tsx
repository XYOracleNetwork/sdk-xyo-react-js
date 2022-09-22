import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { PayloadArchivist } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPanel } from '@xyo-network/panel'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivist } from '@xyo-network/react-archivist'
import { useAccount } from '@xyo-network/react-wallet'
import { XyoWitness } from '@xyo-network/witness'
import { useEffect, useState } from 'react'

import { PanelContext } from './Context'
import { PanelReportProgress, ReportStatus } from './State'

export interface PanelProviderProps {
  archivist?: PayloadArchivist
  witnesses?: XyoWitness<XyoPayload>[]
  required?: boolean
  archive?: string
}

export const PanelProvider: React.FC<WithChildren<PanelProviderProps>> = ({
  archivist: archivistProp,
  required = false,
  witnesses = [],
  children,
}) => {
  const { archive } = useArchive()
  const { archivist } = useArchivist()
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<PanelReportProgress>({})
  const [status, setStatus] = useState(ReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const { account } = useAccount()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist: PayloadArchivist | undefined = archivistProp ?? archivist
      const panel = activeArchivist
        ? new XyoPanel(
            {
              archive,
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
              onWitnessReportEnd: (witness: XyoWitness, error?: Error) => {
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
              onWitnessReportStart: (witness: XyoWitness) => {
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
              witnesses: witnesses.filter((witness) => !!witness),
            },
            activeArchivist,
          )
        : undefined
      setPanel(panel)
      await delay(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archive, archivist, witnesses],
  )

  useEffect(() => {
    setHistory(panel?.history)
  }, [panel])

  return !required || panel ? (
    <PanelContext.Provider value={{ history, panel, progress, provided: true, reportingErrors, status }}>{children}</PanelContext.Provider>
  ) : null
}
