import { WithChildren } from '@xylabs/react-shared'

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {}

export type ContextExProviderProps<T extends EmptyObject = EmptyObject> = WithChildren<
  {
    required?: boolean
  } & T
>
