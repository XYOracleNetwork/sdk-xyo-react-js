import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { AccountInstance } from '@xyo-network/account-model'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { useNode } from '@xyo-network/react-node'
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
  name?: string
  required?: boolean
  witnesses?: string[]
}

export const SentinelProvider: React.FC<WithChildren<SentinelProviderProps>> = ({
  account,
  archivist,
  children,
  name,
  witnesses = [],
  required = false,
}) => {
  const [node] = useNode()
  const [sentinel, setSentinel] = useState<MemorySentinel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()
  const [progress, setProgress] = useState<SentinelReportProgress>({})
  const [status, setStatus] = useState(SentinelReportStatus.Idle)
  const [reportingErrors, setReportingErrors] = useState<Error[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const witnessModules = (await node?.resolve({ address: witnesses })) as WitnessModule[]
      const sentinel = await MemorySentinel.create({
        account,
        config: {
          archivists: archivist ? [archivist] : undefined,
          name,

          schema: SentinelConfigSchema,
          witnesses,
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
        sentinel.on('ReportStart', () => {
          if (mounted()) {
            setProgress({ archivists: {}, witnesses: {} })
            setStatus(SentinelReportStatus.Started)
          }
        }),
      )
      witnessModules?.forEach((witness) => {
        offCallbacks.push(
          witness.on('reportEnd', ({ module, errors }) => {
            const witnesses = progress.witnesses ?? {}
            witnesses[witness.address] = {
              status: errors?.length ? SentinelReportStatus.Failed : SentinelReportStatus.Succeeded,
              witness: module as WitnessModule,
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
              witness: module as WitnessModule,
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
    [account, archivist, witnesses, node],
  )

  useEffect(() => {
    setHistory(sentinel?.history as XyoBoundWitness[])
  }, [sentinel])

  return !required || sentinel ? (
    <SentinelContext.Provider value={{ history, progress, provided: true, reportingErrors, sentinel, status }}>{children}</SentinelContext.Provider>
  ) : null
}
