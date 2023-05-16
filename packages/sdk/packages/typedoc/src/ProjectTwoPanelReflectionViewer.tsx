import { assertEx } from '@xylabs/assert'
import { ProjectReflection, ReflectionKind } from 'typedoc'

import { ContainerReflectionViewerProps, DeclarationContainerReflectionViewer } from './ReflectionViewer'
import { TwoPanelReflectionViewer } from './TwoPanelReflectionViewer'

export const ProjectTwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({
  reflection,
  itemRenderer = DeclarationContainerReflectionViewer,
  ...props
}) => {
  assertEx(reflection.kind === ReflectionKind.Project, `Project !== ${ReflectionKind.singularString(reflection.kind)}`)
  return <TwoPanelReflectionViewer itemRenderer={itemRenderer} reflection={reflection} {...props} />
}
