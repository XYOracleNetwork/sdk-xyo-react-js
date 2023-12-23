import type { ContainerReflection, DeclarationReflection } from 'typedoc'

export const createLookup = <T extends DeclarationReflection>(reflection: ContainerReflection) => {
  const lookup: Record<number, T> = {}
  if (reflection.children) for (const item of reflection.children) lookup[item.id] = item as unknown as T
  return lookup
}
