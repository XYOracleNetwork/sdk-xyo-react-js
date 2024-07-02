/* eslint-disable unicorn/no-array-push-push */
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { AccountInstance } from '@xyo-network/account-model'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { ModuleFilter } from '@xyo-network/module-model'
import { useWitnessesFromNode } from '@xyo-network/react-witness'
import { MemorySentinel } from '@xyo-network/sentinel-memory'
import { SentinelConfig, SentinelConfigSchema } from '@xyo-network/sentinel-model'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'
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
  witnesses?: WitnessInstance[]
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
          synchronous: true,
          // eslint-disable-next-line id-denylist
          tasks: witnesses?.map((mod) => ({ mod: mod.address })),
        } as SentinelConfig,
      })
      const offCallbacks: (() => void)[] = []
      offCallbacks.push(
        sentinel.on('reportEnd', ({ mod, outPayloads }) => {
          if (mounted()) {
            setProgress({
              archivists: progress.archivists,
              witnesses: progress.witnesses,
            })
            setStatus(outPayloads?.length ? SentinelReportStatus.Succeeded : SentinelReportStatus.Failed)
            setReportingErrors([new Error(`Witness failed [${mod?.config?.name ?? mod.address}]`)])
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
      if (witnesses)
        for (const witness of witnesses) {
          offCallbacks.push(
            witness.on('observeEnd', ({ mod, outPayloads }) => {
              const witnesses = progress.witnesses ?? {}
              witnesses[witness.address] = {
                status: outPayloads?.length ? SentinelReportStatus.Succeeded : SentinelReportStatus.Failed,
                witness: asWitnessInstance(mod, () => `Module is not a witness [${mod.id}]`),
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
            witness.on('observeStart', ({ mod }) => {
              const witnesses = progress.witnesses ?? {}
              witnesses[witness.address] = {
                status: SentinelReportStatus.Started,
                witness: asWitnessInstance(mod, () => `Module is not a witness [${mod.id}]`),
              }
              if (mounted()) {
                setProgress({
                  archivists: progress.archivists,
                  witnesses,
                })
              }
            }),
          )
        }
      setSentinel(sentinel as MemorySentinel)
      return () => {
        //unsubscribe from events
        for (const callback of offCallbacks) {
          callback()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, archivist, witnesses],
  )

  useEffect(() => {
    setHistory(sentinel?.history as BoundWitness[])
  }, [sentinel])

  return !required || sentinel ?
      <SentinelContext.Provider value={{ history, progress, provided: true, reportingErrors, sentinel, status }}>{children}</SentinelContext.Provider>
    : null
}
