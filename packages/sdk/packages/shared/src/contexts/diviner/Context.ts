import type { EmptyObject } from '@xylabs/react-shared'
import { createContextEx } from '@xylabs/react-shared'

export const ResolvedDivinerContext = <T extends EmptyObject>() => createContextEx<T>()
