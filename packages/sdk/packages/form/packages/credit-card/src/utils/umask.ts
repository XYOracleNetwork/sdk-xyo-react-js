export function unmask(value: string) {
  return value.replaceAll(/\D/g, '')
}
