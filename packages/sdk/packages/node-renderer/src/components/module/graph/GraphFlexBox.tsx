import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module-model'
import React, { useRef } from 'react'

import { CytoscapeInstanceProvider } from '../../../contexts/index.js'
import { useElements, useModuleDetails, useRelationalGraphOptions } from '../../../hooks/index.js'
import { WithExtensions } from '../../cytoscape-extensions/index.js'
import { NodeRelationalGraphFlexBox } from '../../relational/index.js'
import { DetailsFlexbox } from './DetailsFlexbox.js'
import { ModuleGraphNodeHover } from './node/index.js'
import { StyledModuleHoverPopper } from './Popper.js'

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

  const { mod, onModuleDetails } = useModuleDetails(rootModule, () => setHoveredNode(undefined))

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          mod
            ? null
            : hideActions
              ? null
              : (
                  <Button size="small" onClick={handleToggleLabels} variant="contained">
                    Toggle Labels
                  </Button>
                )

        }
        showDetails={!!mod}
        detail={<DetailsFlexbox onClose={() => onModuleDetails(null)} />}
        options={options}
        ref={cytoscapeRef}
        width="100%"
        {...props}
      >
        <ModuleGraphNodeHover node={hoveredNode}>
          {element => (
            <StyledModuleHoverPopper
              anchorEl={element}
              container={cytoscapeRef.current}
              node={hoveredNode}
              onClose={() => setHoveredNode(undefined)}
              onModuleExplore={toggleSelectedElement}
              onModuleDetails={disableModuleDetails ? undefined : onModuleDetails}
              placement="top"
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
