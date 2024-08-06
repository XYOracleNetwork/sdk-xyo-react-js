import { IndexedResultsConfig, IndexedResultsQueue, PollingConfig } from '../../interfaces/index.ts'

export interface UseIndexedResultsConfig {
  /** Indexed Results Configuration */
  indexedResultsConfig: IndexedResultsConfig
  /** Configuration for polling diviners */
  pollingConfig?: PollingConfig
  /** Queue for handling Promise Results */
  queueConfig?: IndexedResultsQueue
  /** External trigger to start the hook logic */
  trigger?: boolean
}
