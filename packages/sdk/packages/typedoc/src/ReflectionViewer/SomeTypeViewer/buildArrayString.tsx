import type { ArrayType } from 'typedoc'

import type { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'
import type { TypeBuilder } from './TypeBuilder.ts'

export const buildArrayString = (typeObj: ArrayType, reflectionViewer: React.FC<ReflectionViewerProps>, typeBuilder: TypeBuilder) => {
  const parts: string[] = []
  const typeString = typeBuilder(typeObj.elementType, reflectionViewer)
  if (typeof typeString === 'string') {
    parts.push(typeString)
  }
  parts.push('[]')
  return parts
}
