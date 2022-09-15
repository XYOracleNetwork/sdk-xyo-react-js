import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { Archivist, PayloadArchivist } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPanel } from '@xyo-network/panel'
import { XyoPayload } from '@xyo-network/payload'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivist } from '@xyo-network/react-archivist'
import { useAccount } from '@xyo-network/react-wallet'
import { XyoWitness } from '@xyo-network/witness'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'
import { XyoPanelReportProgress, XyoReportStatus } from './State'

export interface XyoPanelProviderProps {
  archivist?: Archivist
  witnesses?: XyoWitness<XyoPayload>[]
  required?: boolean
  archive?: string
}

export const XyoPanelProvider: React.FC<WithChildren<XyoPanelProviderProps>> = ({
  archivist: archivistProp,
  required = false,
  witnesses = [],
  children,
}) => {
  const { archive } = useArchive()
  const { archivist } = useArchivist()
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<XyoPanelReportProgress>({})
  const [status, setStatus] = useState(XyoReportStatus.Idle)
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

  return (
    <XyoPanelContext.Provider value={{ history, panel, progress, provided: true, reportingErrors, status }}>
      {panel ? children : required ? null : children}
    </XyoPanelContext.Provider>
  )
}
