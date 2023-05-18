import { ReactNode } from 'react'
import type { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildArrayString } from './buildArrayString'
import { buildIntersectionString } from './buildIntersectionString'
import { buildReferenceString } from './buildReferenceString'
import { buildRelfectionString } from './buildReflectionString'
import { buildUnionString } from './buildUnionString'
import { TypeBuilder } from './TypeBuilder'

export const buildTypeString: TypeBuilder = (type: SomeType | Type, reflectionViewer: React.FC<ReflectionViewerProps>): ReactNode => {
  const someType = type as SomeType
  const parts: string[] = []

  switch (someType.type) {
    case 'intrinsic':
      parts.push(someType.name)
      break
    case 'intersection': {
      parts.push(...buildIntersectionString(someType, reflectionViewer, buildTypeString))
      break
    }
    case 'literal':
      parts.push(JSON.stringify(someType.value))
      break
    case 'array': {
      parts.push(...buildArrayString(someType, reflectionViewer, buildTypeString))
      break
    }
    case 'reference': {
      parts.push(...buildReferenceString(someType, reflectionViewer, buildTypeString))
      break
    }
    case 'union': {
      parts.push(...buildUnionString(someType, reflectionViewer, buildTypeString))
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
