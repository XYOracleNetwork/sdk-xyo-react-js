import { Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'
import { SomeType, Type } from 'typedoc'

import { SomeReflection } from '../SomeReflection'
import { ReflectionViewerProps } from './ReflectionViewerProps'

const buildTypeString = (type: SomeType | Type, reflectionViewer: React.FC<ReflectionViewerProps>): ReactNode => {
  const someType = type as SomeType
  const parts: string[] = []
  switch (someType.type) {
    case 'intrinsic':
      parts.push(someType.name)
      break
    case 'intersection': {
      if (someType.types) {
        parts.push(
          someType.types
            .map((arg) => {
              return buildTypeString(arg, reflectionViewer)
            })
            .join(' & ')
        )
      }
      break
    }
    case 'literal':
      parts.push(JSON.stringify(someType.value))
      break
    case 'array': {
      const typeString = buildTypeString(someType.elementType, reflectionViewer)
      if (typeof typeString === 'string') {
        parts.push(typeString)
      }
      parts.push('[]')
      break
    }
    case 'reference': {
      parts.push(someType.name)
      if (someType.typeArguments) {
        parts.push('<')
        parts.push(
          someType.typeArguments
            .map((arg) => {
              return buildTypeString(arg, reflectionViewer)
            })
            .join(', ')
        )
        parts.push('>')
      }
      break
    }
    case 'union': {
      if (someType.types) {
        parts.push(
          someType.types
            .map((arg) => {
              return buildTypeString(arg, reflectionViewer)
            })
            .join(' | ')
        )
      }
      break
    }
    case 'reflection': {
      if (someType.declaration) {
        return <>{reflectionViewer({ reflection: someType.declaration })}</>
      }
      break
    }
    default:
      parts.push('#')
      parts.push(someType.type)
      parts.push('#')
      break
  }
  return parts.join('')
}

export interface SomeTypeViewerProps extends TypographyProps {
  reflection: SomeReflection
  opacity?: number
  reflectionViewer: React.FC<ReflectionViewerProps>
}

export const SomeTypeViewer: React.FC<SomeTypeViewerProps> = ({
  reflectionViewer,
  opacity = 0.5,
  reflection,
  ...props
}) => {
  const typeReactNode = reflection.type ? buildTypeString(reflection.type, reflectionViewer) : ''
  if (typeof typeReactNode === 'string') {
    return (
      <Typography title="SomeTypeViewer" style={{ opacity }} {...props}>
        {typeReactNode}
      </Typography>
    )
  }
  return <>{typeReactNode}</>
}
