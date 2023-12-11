import { FreshIndexedResult } from './FreshIndexedResult'
import { IndexedQuery } from './IndexedQuery'
import { IndexedSources } from './IndexedSources'
import { ProcessIndexedResults } from './ProcessIndexedResults'

export interface IndexedResultsConfig {
  indexedQueryConfig: IndexedQuery
  indexedSourceConfig: IndexedSources
  freshIndexedResultConfig: FreshIndexedResult
  processIndexedResults: ProcessIndexedResults
}
