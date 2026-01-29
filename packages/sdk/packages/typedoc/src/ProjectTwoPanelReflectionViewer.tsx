import { assertEx } from '@xylabs/sdk-js'
import React from 'react'
import type { ProjectReflection } from 'typedoc'

import type { ContainerReflectionViewerProps } from './ReflectionViewer/index.ts'
import { DeclarationContainerReflectionViewer } from './ReflectionViewer/index.ts'
import { TwoPanelReflectionViewer } from './TwoPanelReflectionViewer.tsx'

export const ProjectTwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({
  reflection,
  itemRenderer = DeclarationContainerReflectionViewer,
  ...props
}) => {
  assertEx(reflection.isProject, () => 'Project expected to be Project')
  return <TwoPanelReflectionViewer itemRenderer={itemRenderer} reflection={reflection} {...props} />
}
