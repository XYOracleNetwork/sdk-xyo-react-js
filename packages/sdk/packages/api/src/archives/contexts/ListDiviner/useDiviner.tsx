import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchiveList } from '@xyo-network/api'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { useState } from 'react'

import { useArchiveListApiDiviner } from './use'

export const useDivineArchiveList = (): [ArchiveList[] | undefined, Error | undefined, () => void] => {
  const [archiveList, setArchiveList] = useState<ArchiveList[]>()
  const [error, setError] = useState<Error>()
  const { diviner } = useArchiveListApiDiviner()
  const [refresh, setRefresh] = useState(1)

  const refreshArchiveList = () => setRefresh((previous) => previous + 1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner) {
        try {
          const result = (await new XyoDivinerWrapper(diviner).divine()) as ArchiveList[]
          if (mounted() && result) {
            setArchiveList(result)
          }
        } catch (e) {
          setError(e as Error)
        }
      }
    },
    [diviner, refresh],
  )

  return [archiveList, error, refreshArchiveList]
}
