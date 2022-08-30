export const trimFlagLabel = (label: string) => {
  if (label.startsWith('is')) {
    return label.substring(2)
  }
  return label
}
