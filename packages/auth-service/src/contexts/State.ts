import Rollbar from 'rollbar'

export interface ErrorReporterContextState {
  rollbar?: Rollbar
}
