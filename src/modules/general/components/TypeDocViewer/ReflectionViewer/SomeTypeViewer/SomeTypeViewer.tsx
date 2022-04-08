import { Typography, TypographyProps } from '@mui/material'

import { SomeReflection } from '../../SomeReflection'
import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildTypeString } from './buildTypeString'

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
