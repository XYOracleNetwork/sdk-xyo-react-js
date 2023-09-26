import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { useModuleFromNode } from '@xyo-network/react-node'
import { CytoscapeOptions, EventObject, NodeDataDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { useCytoscapeElements, useRelationalGraphOptions } from '../hooks'
import { NodeRelationalGraphFlexBox } from './RelationalGraph'
import { WithCola } from './WithCola'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { cy } = useCytoscapeInstance(true)
  const options = useRelationalGraphOptions(rootModule ?? undefined)

  const [selectedElement, setSelectedElement] = useState<NodeDataDefinition>()
  const { address: selectedAddress } = selectedElement?.data() ?? {}
  const [module] = useModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(module)

  const [updatedOptions, setUpdatedOptions] = useState<CytoscapeOptions>()

  useEffect(() => {
    const { elements, ...rest } = options
    const existingElements = Array.isArray(elements) ? elements : []
    if (newElements.length > 1) {
      setUpdatedOptions({
        elements: [...existingElements, ...newElements],
        ...rest,
      })
    }
  }, [newElements, options])

  const resolvedOptions = updatedOptions ?? options

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      // TODO - check for actual children somewhere before updating
      if (element.isNode()) setSelectedElement(element)
    }
    if (cy) {
      cy.on('select', listener)
    }

    return () => {
      cy?.off('select', listener)
    }
  }, [cy])

  return (
    <WithCola>
      <NodeRelationalGraphFlexBox options={resolvedOptions} {...props} />
    </WithCola>
  )
}
