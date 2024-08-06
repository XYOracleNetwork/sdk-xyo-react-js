import { TypographyVariant } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ReactElement } from 'react'
import type { Reflection } from 'typedoc'

import { ReflectionLookup } from '../ReflectionLookup.ts'

export type FlagFilter = 'isPublic' | 'isPrivate' | 'isProtected'

export interface ReflectionViewerProps<T extends Reflection = Reflection> extends FlexBoxProps {
  hiddenFlags?: FlagFilter[]
  lookup?: ReflectionLookup
  nameViewer?: ReactElement | null
  reflection: T
  sources?: boolean
  variant?: TypographyVariant
}
