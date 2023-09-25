import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { EventObject, NodeDataDefinition } from 'cytoscape'
import { useEffect, useMemo, useState } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { useCytoscapeElements, useRelationalGraphOptions } from '../hooks'
import { NodeRelationalGraphFlexBox } from './RelationalGraph'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { cy } = useCytoscapeInstance(true)
  const options = useRelationalGraphOptions(rootModule ?? undefined)

  const [selectedElement, setSelectedElement] = useState<NodeDataDefinition>()
  const { address: selectedAddress, rootNodeId: selectedRootNodeId } = selectedElement?.data() ?? {}
  const [module] = useModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(module)

  const updatedOptions = useMemo(() => {
    if (newElements.length) {
      const { elements: existingElements, ...rest } = options
      return {
        elements: [...newElements],
        ...rest,
      }
    }
  }, [newElements, options])

  const resolvedOptions = updatedOptions ?? options

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      setSelectedElement(element)
    }
    if (cy) {
      cy.on('select', listener)
    }

    return () => {
      cy?.off('select', listener)
    }
  }, [cy])

  return <NodeRelationalGraphFlexBox options={resolvedOptions} {...props} />
}
