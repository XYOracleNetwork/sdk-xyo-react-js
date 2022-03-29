import { ReactNode } from 'react'
import { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildArrayString } from './buildArrayString'
import { buildIntersectionString } from './buildIntersectionString'
import { buildReferenceString } from './buildReferenceString'
import { buildRelfectionString } from './buildReflectionString'
import { buildUnionString } from './buildUnionString'

export const buildTypeString = (
  type: SomeType | Type,
  reflectionViewer: React.FC<ReflectionViewerProps>
): ReactNode => {
  const someType = type as SomeType
  const parts: string[] = []

  switch (someType.type) {
    case 'intrinsic':
      parts.push(someType.name)
      break
    case 'intersection': {
      buildIntersectionString(parts, someType, reflectionViewer)
      break
    }
    case 'literal':
      parts.push(JSON.stringify(someType.value))
      break
    case 'array': {
      buildArrayString(parts, someType, reflectionViewer)
      break
    }
    case 'reference': {
      buildReferenceString(parts, someType, reflectionViewer)
      break
    }
    case 'union': {
      buildUnionString(parts, someType, reflectionViewer)
      break
    }
    case 'reflection': {
      return buildRelfectionString(someType, reflectionViewer)
    }
    default:
      parts.push('#')
      parts.push(someType.type)
      parts.push('#')
      break
  }
  return parts.join('')
}
