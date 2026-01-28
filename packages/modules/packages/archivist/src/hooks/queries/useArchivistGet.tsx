import { usePromise } from '@xylabs/react-promise'
import type { Hash } from '@xylabs/sdk-js'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import type { Payload, WithStorageMeta } from '@xyo-network/payload-model'
import type { RefreshCallback } from '@xyo-network/react-module'
import { useRefresh } from '@xyo-network/react-module'

export const useArchivistGet = <T extends Payload = Payload>(
  archivist?: ArchivistInstance | null,
  hashes?: Hash[],
): [T[] | undefined, Error | undefined, RefreshCallback] => {
  const [enabled, refresh] = useRefresh()

  const [payloads, error] = usePromise(async () => {
    if (enabled && archivist && hashes) {
      return (await archivist.get(hashes)) as WithStorageMeta<T>[]
    }
  }, [archivist, hashes, enabled])

  return [payloads, error, refresh]
}
