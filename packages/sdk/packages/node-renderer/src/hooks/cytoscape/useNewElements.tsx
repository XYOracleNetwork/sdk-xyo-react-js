import { useModuleFromNode } from '@xyo-network/react-node'
import { NodeSingular } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { useCytoscapeElements } from './useCytoscapeElements'

export const useNewElements = (selectedElement?: NodeSingular) => {
  const { cy } = useCytoscapeInstance(true)
  const { address: selectedAddress } = selectedElement?.data() ?? {}
  const [module] = useModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(module)

  useEffect(() => {
    if (selectedAddress) {
      const element = cy?.$(`node[id="${selectedAddress}"]`)
      if (element?.length) cy?.center(element)
    }
  }, [cy, selectedAddress])

  return newElements
}
