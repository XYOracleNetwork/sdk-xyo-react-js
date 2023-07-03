import { usePromise } from '@xylabs/react-promise'
import { AccountInstance } from '@xyo-network/account-model'
import { ArchivistModule } from '@xyo-network/archivist'
import { Payload } from '@xyo-network/payload-model'
import { RefreshCallback, useRefresh } from '@xyo-network/react-module'

import { useWrappedArchivist } from '../useWrappedArchivist'

export const useArchivistGet = <T extends Payload = Payload>(
  archivist?: ArchivistModule | null,
  hashes?: string[],
  account?: AccountInstance,
): [T[] | undefined, Error | undefined, RefreshCallback] => {
  const [wrappedArchivist] = useWrappedArchivist(archivist, account)
  const [enabled, refresh] = useRefresh()

  const [payloads, error] = usePromise(async () => {
    if (enabled && wrappedArchivist && hashes) {
      return (await wrappedArchivist?.get(hashes)) as T[]
    }
  }, [wrappedArchivist, hashes, enabled])

  return [payloads, error, refresh]
}
