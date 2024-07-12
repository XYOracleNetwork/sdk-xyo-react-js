import { ReactNode } from 'react'
import type { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.js'

export type TypeBuilder = (type: SomeType | Type, reflectionViewer: React.FC<ReflectionViewerProps>, typeBuilder?: TypeBuilder) => ReactNode
