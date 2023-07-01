import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { AccountInstance } from '@xyo-network/account-model'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ModuleFilter } from '@xyo-network/module'
import { useWitnessesFromNode } from '@xyo-network/react-witness'
import { MemorySentinel, SentinelConfig, SentinelConfigSchema } from '@xyo-network/sentinel'
import { WitnessModule } from '@xyo-network/witness'
import { useEffect, useState } from 'react'

import { SentinelContext } from './Context'
import { SentinelReportProgress, SentinelReportStatus } from './State'

export interface SentinelProviderProps {
  /** Account used by the sentinel for signing */
  account: AccountInstance
  /** @deprecated - sentinel no longer uses archive but relies on an archivist */
  archive?: string
  archivist?: string
  filter?: ModuleFilter
  name?: string
  required?: boolean
  witnesses?: WitnessModule[]
}

export const SentinelProvider: React.FC<WithChildren<SentinelProviderProps>> = ({ account, archivist, children, filter, name, required = false }) => {
  const [sentinel, setSentinel] = useState<MemorySentinel>()
  const [history, setHistory] = useState<BoundWitness[]>()
  const [progress, setProgress] = useState<SentinelReportProgress>({})
  const [status, setStatus] = useState(SentinelReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()
  const [witnesses] = useWitnessesFromNode(filter)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const sentinel = await MemorySentinel.create({
        account,
        config: {
          archivists: archivist ? [archivist] : undefined,
          name,

          schema: SentinelConfigSchema,
          witnesses: witnesses?.map((module) => module.address),
        } as SentinelConfig,
      })
      const offCallbacks: (() => void)[] = []
      offCallbacks.push(
        sentinel.on('reportEnd', ({ errors }) => {
          if (mounted()) {
            setProgress({
              archivists: progress.archivists,
              witnesses: progress.witnesses,
            })
            setStatus(errors ? SentinelReportStatus.Failed : SentinelReportStatus.Succeeded)
            setReportingErrors(errors)
          }
        }),
      )
      offCallbacks.push(
        sentinel.on('reportStart', () => {
          if (mounted()) {
            setProgress({ archivists: {}, witnesses: {} })
            setStatus(SentinelReportStatus.Started)
          }
        }),
      )
      witnesses?.forEach((witness) => {
        offCallbacks.push(
          witness.on('reportEnd', ({ module, errors }) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: errors?.length ? SentinelReportStatus.Failed : SentinelReportStatus.Succeeded,
              witness: module,
            }
            if (mounted()) {
              setProgress({
                archivists: progress.archivists,
                witnesses,
              })
            }
          }),
        )
        offCallbacks.push(
          witness.on('reportStart', ({ module }) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: SentinelReportStatus.Started,
              witness: module,
            }
            if (mounted()) {
              setProgress({
                archivists: progress.archivists,
                witnesses,
              })
            }
          }),
        )
      })
      setSentinel(sentinel as MemorySentinel)
      return () => {
        //unsubscribe from events
        offCallbacks.forEach((callback) => {
          callback()
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archivist, witnesses],
  )

  useEffect(() => {
    setHistory(sentinel?.history as BoundWitness[])
  }, [sentinel])

  return !required || sentinel ? (
    <SentinelContext.Provider value={{ history, progress, provided: true, reportingErrors, sentinel, status }}>{children}</SentinelContext.Provider>
  ) : null
}
