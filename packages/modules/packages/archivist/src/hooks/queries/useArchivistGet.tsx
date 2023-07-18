import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance } from '@xyo-network/archivist'
import { Payload } from '@xyo-network/payload-model'
import { RefreshCallback, useRefresh } from '@xyo-network/react-module'

export const useArchivistGet = <T extends Payload = Payload>(
  archivist?: ArchivistInstance | null,
  hashes?: string[],
): [T[] | undefined, Error | undefined, RefreshCallback] => {
  const [enabled, refresh] = useRefresh()

  const [payloads, error] = usePromise(async () => {
    if (enabled && archivist && hashes) {
      return (await archivist.get(hashes)) as T[]
    }
  }, [archivist, hashes, enabled])

  return [payloads, error, refresh]
}
