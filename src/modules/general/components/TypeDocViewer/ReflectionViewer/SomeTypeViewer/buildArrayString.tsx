import { ArrayType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { TypeBuilder } from './TypeBuilder'

export const buildArrayString = (typeObj: ArrayType, reflectionViewer: React.FC<ReflectionViewerProps>, typeBuilder: TypeBuilder) => {
  const parts: string[] = []
  const typeString = typeBuilder(typeObj.elementType, reflectionViewer)
  if (typeof typeString === 'string') {
    parts.push(typeString)
  }
  parts.push('[]')
  return parts
}
