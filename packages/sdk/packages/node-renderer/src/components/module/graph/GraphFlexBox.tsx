import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { useRef } from 'react'

import { CytoscapeInstanceProvider } from '../../../contexts'
import { useHoveredNode, useModuleDetails, useNewElements, useRelationalGraphOptions, useRenderNewElements, useSelectedElement } from '../../../hooks'
import { WithExtensions } from '../../cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from '../../RelationalGraph'
import { DetailsFlexbox } from './DetailsFlexbox'
import { ModuleGraphNodeHover } from './node'
import { StyledModuleHoverPopper } from './Popper'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const cytoscapeRef = useRef<HTMLDivElement>(null)
  const { handleToggleLabels, hideLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)
  const selectedElement = useSelectedElement()
  const newElements = useNewElements(selectedElement)
  const renderedElements = useRenderNewElements(newElements, hideLabels)
  const [hoveredNode, setHoveredNode] = useHoveredNode(renderedElements)

  const { module, onModuleDetails } = useModuleDetails(rootModule, () => setHoveredNode(undefined))

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          <Button size={'small'} onClick={handleToggleLabels} variant="contained">
            Toggle Labels
          </Button>
        }
        showDetails={!!module}
        detail={<DetailsFlexbox onClose={() => onModuleDetails(null)} />}
        options={options}
        ref={cytoscapeRef}
        width="100%"
        {...props}
      >
        <ModuleGraphNodeHover node={hoveredNode}>
          {(element) => (
            <StyledModuleHoverPopper
              anchorEl={element}
              container={cytoscapeRef.current}
              node={hoveredNode}
              onClose={() => setHoveredNode(undefined)}
              onModuleDetails={onModuleDetails}
              placement={'top'}
              open
            />
          )}
        </ModuleGraphNodeHover>
      </NodeRelationalGraphFlexBox>
    </WithExtensions>
  )
}

export const ModuleGraphFlexBoxWithProvider: React.FC<ModuleGraphFlexBoxProps> = (props) => {
  return (
    <CytoscapeInstanceProvider>
      <ModuleGraphFlexBox {...props} />
    </CytoscapeInstanceProvider>
  )
}
