export const assertDefinedEx = <T>(expr?: T | null, message?: string): T => {
  if (expr !== null && expr !== undefined) return expr
  throw new Error(message)
}
