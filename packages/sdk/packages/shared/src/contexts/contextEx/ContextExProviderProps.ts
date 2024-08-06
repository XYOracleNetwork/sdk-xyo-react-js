import { WithChildren } from '@xylabs/react-shared'

export type EmptyObject = {}

export type ContextExProviderProps<T extends EmptyObject = EmptyObject> = WithChildren<
  {
    required?: boolean
  } & T
>
