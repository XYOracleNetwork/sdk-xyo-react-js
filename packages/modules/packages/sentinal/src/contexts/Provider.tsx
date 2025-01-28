/* eslint-disable unicorn/no-array-push-push */
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { AccountInstance } from '@xyo-network/account-model'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import { useWitnessesFromNode } from '@xyo-network/react-witness'
import { MemorySentinel } from '@xyo-network/sentinel-memory'
import type { SentinelConfig } from '@xyo-network/sentinel-model'
import { SentinelConfigSchema } from '@xyo-network/sentinel-model'
import type { WitnessInstance } from '@xyo-network/witness-model'
import { asWitnessInstance } from '@xyo-network/witness-model'
import type { PropsWithChildren } from 'react'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { SentinelContext } from './Context.ts'
import type { SentinelReportProgress } from './State.ts'
import { SentinelReportStatus } from './State.ts'

export interface SentinelProviderProps {
  /** Account used by the sentinel for signing */
  account: AccountInstance
  /** @deprecated - sentinel no longer uses archive but relies on an archivist */
  archive?: string
  archivist?: string
  ids?: ModuleIdentifier[]
  name?: string
  required?: boolean
  witnesses?: WitnessInstance[]
}

export const SentinelProvider: React.FC<PropsWithChildren<SentinelProviderProps>> = ({
  account, archivist, children, ids, name, required = false,
}) => {
  const [sentinel, setSentinel] = useState<MemorySentinel>()
  const [history, setHistory] = useState<BoundWitness[]>()
  const [progress, setProgress] = useState<SentinelReportProgress>({})
  const [status, setStatus] = useState<SentinelReportStatus>(SentinelReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()
  const [witnesses] = useWitnessesFromNode(ids)

  useAsyncEffect(

    async (mounted) => {
      const sentinel = await MemorySentinel.create({
        account,
        config: {
          archivists: archivist ? [archivist] : undefined,
          name,

          schema: SentinelConfigSchema,
          synchronous: true,

          tasks: witnesses?.map(mod => ({ mod: mod.address })),
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
        // unsubscribe from events
        for (const callback of offCallbacks) {
          callback()
        }
      }
    },

    [account, archivist, witnesses],
  )

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setHistory(sentinel?.history as BoundWitness[])
  }, [sentinel])

  const value = useMemo(() => ({
    history, progress, provided: true, reportingErrors, sentinel, status,
  }), [history, progress, reportingErrors, sentinel, status])

  return !required || sentinel

    ? (
        <SentinelContext.Provider value={value}>
          {children}
        </SentinelContext.Provider>
      )
    : null
}
