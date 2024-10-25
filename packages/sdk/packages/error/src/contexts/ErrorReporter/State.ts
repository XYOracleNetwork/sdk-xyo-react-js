import type Rollbar from 'rollbar'

/** @deprecated use from @xylabs/react-error instead */
export interface ErrorReporterContextState {
  rollbar?: Rollbar
}
