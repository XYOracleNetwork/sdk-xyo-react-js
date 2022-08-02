import { WithChildren } from '@xylabs/react-shared'
import { EmptyObject } from '@xyo-network/core'

export type ContextExProviderProps<T extends EmptyObject = EmptyObject> = WithChildren<
  {
    required?: boolean
  } & T
>
