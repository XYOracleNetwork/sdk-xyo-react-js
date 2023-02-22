import { delay } from '@xylabs/delay'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { Account } from '@xyo-network/account'
import { ArchivistModule, ArchivistWrapper } from '@xyo-network/archivist'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { CompositeModuleResolver } from '@xyo-network/module'
import { AbstractSentinel, SentinelConfig, SentinelConfigSchema } from '@xyo-network/sentinel'
import { WitnessModule, WitnessWrapper } from '@xyo-network/witness'
import { useEffect, useMemo, useState } from 'react'

import { SentinelContext } from './Context'
import { SentinelReportProgress, SentinelReportStatus } from './State'

export interface SentinelProviderProps {
  /** Account used by the sentinel for signing */
  account?: Account
  /** @deprecated - sentinel no longer uses archive but relies on an archivist */
  archive?: string
  archivist?: ArchivistModule
  name?: string
  required?: boolean
  witnesses?: WitnessModule[]
}

export const SentinelProvider: React.FC<WithChildren<SentinelProviderProps>> = ({
  account,
  archivist,
  children,
  name,
  witnesses = [],
  required = false,
}) => {
  const [sentinel, setSentinel] = useState<AbstractSentinel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<SentinelReportProgress>({})
  const [status, setStatus] = useState(SentinelReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  const resolver = useMemo(() => {
    const resolver = new CompositeModuleResolver().add(witnesses)
    return archivist ? resolver.add(archivist) : resolver
  }, [archivist, witnesses])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const archivistWrapper = archivist ? new ArchivistWrapper(archivist) : undefined
      const sentinel = await AbstractSentinel.create({
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
              setStatus(errors ? SentinelReportStatus.Failed : SentinelReportStatus.Succeeded)
              setReportingErrors(errors)
            }
          },
          onReportStart: () => {
            if (mounted()) {
              setProgress({ archivists: {}, witnesses: {} })
              setStatus(SentinelReportStatus.Started)
            }
          },
          onWitnessReportEnd: (witness: WitnessWrapper, error?: Error) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: error ? SentinelReportStatus.Failed : SentinelReportStatus.Succeeded,
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
              status: SentinelReportStatus.Started,
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
        resolver,
      })
      setSentinel(sentinel)
      await delay(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archivist, witnesses],
  )

  useEffect(() => {
    setHistory(sentinel?.history as XyoBoundWitness[])
  }, [sentinel])

  return !required || sentinel ? (
    <SentinelContext.Provider value={{ history, progress, provided: true, reportingErrors, sentinel, status }}>{children}</SentinelContext.Provider>
  ) : null
}
