import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module-model'
import { useRef } from 'react'

import { CytoscapeInstanceProvider } from '../../../contexts'
import { useElements, useModuleDetails, useRelationalGraphOptions } from '../../../hooks'
import { WithExtensions } from '../../cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from '../../relational'
import { DetailsFlexbox } from './DetailsFlexbox'
import { ModuleGraphNodeHover } from './node'
import { StyledModuleHoverPopper } from './Popper'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  disableModuleDetails?: boolean
  hideActions?: boolean
  layout?: 'dagre' | 'euler' | 'cose-bilkent' | 'cola'
  layoutOptions?: object
  rootModule?: WeakRef<ModuleInstance> | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ hideActions, rootModule, disableModuleDetails, ...props }) => {
  const cytoscapeRef = useRef<HTMLDivElement>(null)
  const { handleToggleLabels, hideLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)
  const { hoveredNode, setHoveredNode, toggleSelectedElement } = useElements(hideLabels)

  const { module, onModuleDetails } = useModuleDetails(rootModule, () => setHoveredNode(undefined))

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          module ? null
          : hideActions ?
            null
          : <Button size={'small'} onClick={handleToggleLabels} variant="contained">
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
              //container={cytoscapeRef.current}
              node={hoveredNode}
              onClose={() => setHoveredNode(undefined)}
              onModuleExplore={toggleSelectedElement}
              onModuleDetails={disableModuleDetails ? undefined : onModuleDetails}
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
