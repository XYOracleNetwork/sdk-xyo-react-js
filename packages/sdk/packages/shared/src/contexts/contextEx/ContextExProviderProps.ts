import type { PropsWithChildren } from 'react'

export type EmptyObject = {}

export type ContextExProviderProps<T extends EmptyObject = EmptyObject> = PropsWithChildren<
  {
    required?: boolean
  } & T
>
