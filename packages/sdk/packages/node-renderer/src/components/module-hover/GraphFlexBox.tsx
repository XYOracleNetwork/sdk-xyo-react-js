import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { EventObject, NodeSingular } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { useAddNewElements, useNewElements, useRelationalGraphOptions } from '../../hooks'
import { WithExtensions } from '../cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from '../RelationalGraph'
import { ModuleHover } from './Hover'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { cy } = useCytoscapeInstance(true)
  const { handleToggleLabels, hideLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)

  const { newElements, setSelectedElement } = useNewElements()

  useAddNewElements(newElements, hideLabels)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      if (element.isNode()) setSelectedElement(element)
    }
    cy?.on('select', listener)

    return () => {
      cy?.off('select', listener)
    }
  }, [cy, setSelectedElement])

  const [hoveredNode, setHoveredNode] = useState<NodeSingular>()

  useEffect(() => {
    cy?.ready(() => {
      cy.nodes().forEach((node) => {
        node.on('mouseover tap', () => {
          setHoveredNode(node)
        })
        node.on('mouseout', () => {
          setHoveredNode(undefined)
        })
      })
    })
  }, [cy])

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
        <ModuleHover node={hoveredNode} />
      </NodeRelationalGraphFlexBox>
    </WithExtensions>
  )
}
