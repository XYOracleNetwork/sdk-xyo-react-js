import { useAsyncEffect } from '@xylabs/react-shared'
import { SchemaStats } from '@xyo-network/api'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { useState } from 'react'

import { useSchemaStatsApiDiviner } from './use'

export const useDivineSchemaStats = (address?: string): [SchemaStats | undefined, Error | undefined, () => void] => {
  const [stats, setStats] = useState<SchemaStats>()
  const [error, setError] = useState<Error>()
  const { diviner } = useSchemaStatsApiDiviner()
  const [refresh, setRefresh] = useState(1)

  const refreshStats = () => setRefresh((previous) => previous + 1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner && address) {
        try {
          const result = (await new XyoDivinerWrapper(diviner).divine()) as SchemaStats[]
          if (mounted()) {
            setStats(result[0])
          }
        } catch (e) {
          setError(e as Error)
        }
      }
    },
    [address, diviner, refresh],
  )

  return [stats, error, refreshStats]
}
