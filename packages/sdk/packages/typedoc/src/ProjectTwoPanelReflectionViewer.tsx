import { assertEx } from '@xylabs/assert'
import { ProjectReflection } from 'typedoc'

import { ContainerReflectionViewerProps, DeclarationContainerReflectionViewer } from './ReflectionViewer'
import { TwoPanelReflectionViewer } from './TwoPanelReflectionViewer'

export const ProjectTwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({
  reflection,
  itemRenderer = DeclarationContainerReflectionViewer,
  ...props
}) => {
  assertEx(reflection.kindString === 'Project', `Project !== ${reflection.kindString}`)
  return <TwoPanelReflectionViewer itemRenderer={itemRenderer} reflection={reflection} {...props} />
}
