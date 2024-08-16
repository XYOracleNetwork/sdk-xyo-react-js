import type { TypographyVariant } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ReactElement } from 'react'
import type { Reflection } from 'typedoc'

import type { ReflectionLookup } from '../ReflectionLookup.ts'

export type FlagFilter = 'isPublic' | 'isPrivate' | 'isProtected'

export interface ReflectionViewerProps<T extends Reflection = Reflection> extends FlexBoxProps {
  hiddenFlags?: FlagFilter[]
  lookup?: ReflectionLookup
  nameViewer?: ReactElement | null
  reflection: T
  sources?: boolean
  variant?: TypographyVariant
}
