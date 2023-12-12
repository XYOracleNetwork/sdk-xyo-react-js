import { usePromise } from '@xylabs/react-promise'

import { IndexedResultsConfig } from '../interfaces'
import { useTryDiviners } from './support'

export const useIndexedResults = (config: IndexedResultsConfig) => {
  const tryDiviners = useTryDiviners(config)

  const [results] = usePromise(async () => await tryDiviners(), [tryDiviners])

  return [results]
}
