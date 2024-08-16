import type { ReferenceType } from 'typedoc'

import type { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'
import type { TypeBuilder } from './TypeBuilder.ts'

export const buildReferenceString = (typeObj: ReferenceType, reflectionViewer: React.FC<ReflectionViewerProps>, typeBuilder: TypeBuilder) => {
  const parts: string[] = []
  parts.push(typeObj.name)
  if (typeObj.typeArguments) {
    parts.push(
      '<',
      typeObj.typeArguments
        .map((arg) => {
          return typeBuilder(arg, reflectionViewer)
        })
        .join(', '),
      '>',
    )
  }
  return parts
}
