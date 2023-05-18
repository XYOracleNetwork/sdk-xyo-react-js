import type { DeclarationReflection } from 'typedoc'

export type ReflectionLookup<T extends DeclarationReflection = DeclarationReflection> = Record<string, T>
