import { DivinerInstance } from "@xyo-network/diviner-model"
import { Payload } from "@xyo-network/payload-model"
import { useCallback } from "react"
import { IndexedResultsConfig } from "../../interfaces"
import { useFetchModules } from "./useFetchModules"

export const useTryDiviners = (config: IndexedResultsConfig): () => Promise<Payload[] | undefined | null> => {
  const { diviners } = useFetchModules(config.indexedSourceConfig)
  const { indexedQuery: query } = config.indexedQueryConfig
  const { validateDivinerResults } = config.indexedSourceConfig

  const tryDiviner = useCallback(
    async (diviner: DivinerInstance) => {
      const divinedResult = await diviner?.divine([query])
      const validatedResult = await validateDivinerResults(divinedResult)
      return validatedResult && validatedResult.length ? validatedResult : null
    },
    [query, validateDivinerResults],
  )

  const tryDiviners = useCallback(async () => {
    let result: Payload[] | null = null
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
      return result
    }
  }, [tryDiviner])

  return tryDiviners
}