import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { ArchivistWrapper, PayloadArchivist } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { SimpleModuleResolver } from '@xyo-network/module'
import { AbstractNode } from '@xyo-network/node'
import { XyoPanel, XyoPanelConfig, XyoPanelConfigSchema } from '@xyo-network/panel'
import { useArchivist } from '@xyo-network/react-archivist'
import { useNode } from '@xyo-network/react-node'
import { useAccount } from '@xyo-network/react-wallet'
import { WitnessWrapper } from '@xyo-network/witness'
import { useEffect, useMemo, useState } from 'react'

import { PanelContext } from './Context'
import { PanelReportProgress, ReportStatus } from './State'

export interface PanelProviderProps {
  archivist?: PayloadArchivist
  witnesses?: WitnessWrapper[]
  required?: boolean
  archive?: string
}

export const PanelProvider: React.FC<WithChildren<PanelProviderProps>> = ({
  archivist: archivistProp,
  required = false,
  witnesses = [],
  children,
}) => {
  const { archivist } = useArchivist()
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<PanelReportProgress>({})
  const [status, setStatus] = useState(ReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const { account } = useAccount()
  const [node] = useNode<AbstractNode>()

  const resolver = useMemo(() => {
    if (node && node.resolver) {
      return node.resolver
    }
    const resolver = new SimpleModuleResolver().add(witnesses)
    return archivist ? resolver.add(new ArchivistWrapper(archivist)) : resolver
  }, [archivist, node, witnesses])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist: PayloadArchivist | undefined = archivistProp ?? archivist
      const archivistWrapper = activeArchivist ? new ArchivistWrapper(activeArchivist) : undefined
      const panel = archivistWrapper
        ? await XyoPanel.create({
            config: {
              archivists: [archivistWrapper.address],
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
        : undefined
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
