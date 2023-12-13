import { FreshIndexedResult } from './FreshIndexedResult'
import { IndexedQuery } from './IndexedQuery'
import { IndexedSources } from './IndexedSources'
import { ProcessIndexedResults } from './ProcessIndexedResults'

export interface IndexedResultsConfig {
  freshIndexedResultConfig: FreshIndexedResult
  indexedQueryConfig: IndexedQuery
  indexedSourceConfig: IndexedSources
  processIndexedResults: ProcessIndexedResults
}
