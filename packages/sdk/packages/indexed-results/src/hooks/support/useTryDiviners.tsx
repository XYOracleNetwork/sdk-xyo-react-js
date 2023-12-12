import { DivinerInstance } from "@xyo-network/diviner-model"
import { Payload } from "@xyo-network/payload-model"
import { useCallback } from "react"
import { IndexedResultsConfig } from "../../interfaces"
import { useFetchModules } from "./useFetchModules"

export const useTryDiviners = <T extends Payload = Payload>(config: IndexedResultsConfig): () => Promise<Payload[] | undefined | null> => {
  const { diviners } = useFetchModules(config.indexedSourceConfig)
  const { indexedQuery: query } = config.indexedQueryConfig
  const { parseIndexedResults } = config.processIndexedResults

  const tryDiviner = useCallback(
    async (diviner: DivinerInstance) => {
      const divinedResult = await diviner?.divine([query])
      const results = await parseIndexedResults<T>(divinedResult)
      return results && results.length ? results : null
    },
    [query, parseIndexedResults],
  )

  const tryDiviners = useCallback(async () => {
    let result: T[] | undefined | null
    let divinerCount = 0

    if (diviners) {
      while (divinerCount <= diviners?.length) {
        const divinerResult = await tryDiviner(diviners[divinerCount])
        if (divinerResult && divinerResult?.length) {
          result = divinerResult
          break
        }
        divinerCount++
      }
      return result ?? null
    }
  }, [tryDiviner])

  return tryDiviners
}