export const trimFlagLabel = (label: string) => {
  if (label.startsWith('is')) {
    return label.slice(2)
  }
  return label
}
