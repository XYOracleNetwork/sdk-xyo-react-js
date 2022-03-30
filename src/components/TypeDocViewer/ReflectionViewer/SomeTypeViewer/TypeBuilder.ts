import { ReactNode } from 'react'
import { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'

export type TypeBuilder = (
  type: SomeType | Type,
  reflectionViewer: React.FC<ReflectionViewerProps>,
  typeBuilder?: TypeBuilder
) => ReactNode
