import { ReactNode } from 'react'
import type { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.js'
import { buildArrayString } from './buildArrayString.js'
import { buildIntersectionString } from './buildIntersectionString.js'
import { buildReferenceString } from './buildReferenceString.js'
import { buildReflectionString } from './buildReflectionString.js'
import { buildUnionString } from './buildUnionString.js'
import { TypeBuilder } from './TypeBuilder.js'

export const buildTypeString: TypeBuilder = (type: SomeType | Type, reflectionViewer: React.FC<ReflectionViewerProps>): ReactNode => {
  const someType = type as SomeType
  const parts: string[] = []

  switch (someType.type) {
    case 'intrinsic': {
      parts.push(someType.name)
      break
    }
    case 'intersection': {
      parts.push(...buildIntersectionString(someType, reflectionViewer, buildTypeString))
      break
    }
    case 'literal': {
      parts.push(JSON.stringify(someType.value))
      break
    }
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
      return buildReflectionString(someType, reflectionViewer)
    }
    default: {
      parts.push('#', someType.type, '#')
      break
    }
  }
  return parts.join('')
}
