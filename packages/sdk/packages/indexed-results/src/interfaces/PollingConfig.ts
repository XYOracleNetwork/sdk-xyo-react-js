export interface PollingConfig {
  initialDelay?: number
  maxDelay?: number
  /** If null, polling is continuous. */
  maxRetries: number | null
}
