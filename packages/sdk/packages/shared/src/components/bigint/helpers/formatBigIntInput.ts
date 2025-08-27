export const formatBigIntInput = (rawValue: string) => {
  // remove all alpha characters but allow decimals
  const filteredValue = rawValue.replaceAll(/[^\d.]/g, '')
  // only allow one decimal point
  if (filteredValue.split('.').length > 2) return
  return filteredValue
}
