import type Rollbar from 'rollbar'

export interface ErrorReporterContextState {
  rollbar?: Rollbar
}
