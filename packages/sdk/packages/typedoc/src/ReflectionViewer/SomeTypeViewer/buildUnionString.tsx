import type { UnionType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'
import { TypeBuilder } from './TypeBuilder.ts'

export const buildUnionString = (typeObj: UnionType, reflectionViewer: React.FC<ReflectionViewerProps>, typeBuilder: TypeBuilder) => {
  const parts: string[] = []
  if (typeObj.types) {
    parts.push(
      typeObj.types
        .map((arg) => {
          return typeBuilder(arg, reflectionViewer)
        })
        .join(' | '),
    )
  }
  return parts
}
