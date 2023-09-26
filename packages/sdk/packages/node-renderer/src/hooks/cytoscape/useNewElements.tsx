import { useModuleFromNode } from '@xyo-network/react-node'
import { NodeDataDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { useCytoscapeElements } from './useCytoscapeElements'

export const useNewElements = () => {
  const { cy } = useCytoscapeInstance(true)
  const [selectedElement, setSelectedElement] = useState<NodeDataDefinition>()
  const { address: selectedAddress } = selectedElement?.data() ?? {}
  const [module] = useModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(module)

  useEffect(() => {
    if (selectedAddress) {
      const element = cy?.$(`node[id="${selectedAddress}"]`)
      if (element?.length) cy?.center(element)
    }
  }, [cy, selectedAddress])

  return { newElements, setSelectedElement }
}
