import type { ParameterReflection, Reflection, SomeType } from 'typedoc'

export type WithSomeType<T> = T & { type?: SomeType }

export type WithSomeParameters<T> = T & { parameters?: ParameterReflection[] }

export type SomeReflection = WithSomeParameters<WithSomeType<Reflection>>
