import { ReactNode } from 'react'
import type { SomeType, Type } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'
import { buildArrayString } from './buildArrayString.tsx'
import { buildIntersectionString } from './buildIntersectionString.tsx'
import { buildReferenceString } from './buildReferenceString.ts'
import { buildReflectionString } from './buildReflectionString.tsx'
import { buildUnionString } from './buildUnionString.tsx'
import { TypeBuilder } from './TypeBuilder.ts'

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
