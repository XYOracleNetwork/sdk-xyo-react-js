import { assertEx } from '@xylabs/assert'
import type { ProjectReflection } from 'typedoc'

import { ContainerReflectionViewerProps, DeclarationContainerReflectionViewer } from './ReflectionViewer'
import { TwoPanelReflectionViewer } from './TwoPanelReflectionViewer'

export const ProjectTwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({
  reflection,
  itemRenderer = DeclarationContainerReflectionViewer,
  ...props
}) => {
  assertEx(reflection.isProject, () => 'Project expected to be Project')
  return <TwoPanelReflectionViewer itemRenderer={itemRenderer} reflection={reflection} {...props} />
}
