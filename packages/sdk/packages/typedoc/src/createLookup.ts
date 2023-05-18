import type { ContainerReflection, DeclarationReflection } from 'typedoc'

export const createLookup = <T extends DeclarationReflection>(reflection: ContainerReflection) => {
  const lookup: Record<number, T> = {}
  reflection.children?.forEach((item) => (lookup[item.id] = item as unknown as T))
  return lookup
}
