import { TypographyVariant } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { ReactElement } from 'react'
import { Reflection } from 'typedoc'

import { ReflectionLookup } from '../ReflectionLookup'

export type FlagFilter = 'isPublic' | 'isPrivate' | 'isProtected'

export interface ReflectionViewerProps<T extends Reflection = Reflection> extends FlexBoxProps {
  reflection: T
  nameViewer?: ReactElement | null
  lookup?: ReflectionLookup
  hiddenFlags?: FlagFilter[]
  sources?: boolean
  variant?: TypographyVariant
}
