import { useModuleFromNode } from '@xyo-network/react-node'
import { NodeSingular } from 'cytoscape'

import { useCytoscapeElements } from './useCytoscapeElements'

export const useNewElements = (selectedElement?: NodeSingular) => {
  const { address: selectedAddress } = selectedElement?.data() ?? {}
  const [module] = useModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(module)

  return newElements
}
