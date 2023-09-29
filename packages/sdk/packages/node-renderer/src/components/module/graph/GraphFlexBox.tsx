import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'

import { CytoscapeInstanceProvider } from '../../../contexts'
import { useHoveredNode, useNewElements, useRelationalGraphOptions, useRenderNewElements, useSelectedElement } from '../../../hooks'
import { WithExtensions } from '../../cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from '../../RelationalGraph'
import { ModuleGraphNodeHover } from './node'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { handleToggleLabels, hideLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)
  const selectedElement = useSelectedElement()
  const newElements = useNewElements(selectedElement)
  const renderedElements = useRenderNewElements(newElements, hideLabels)
  const hoveredNode = useHoveredNode(renderedElements)

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          <Button size={'small'} onClick={handleToggleLabels} variant="contained">
            Toggle Labels
          </Button>
        }
        options={options}
        {...props}
      >
        <ModuleGraphNodeHover node={hoveredNode} />
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
