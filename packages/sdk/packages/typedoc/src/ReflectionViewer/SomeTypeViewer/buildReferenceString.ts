import type { ReferenceType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.js'
import { TypeBuilder } from './TypeBuilder.js'

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
