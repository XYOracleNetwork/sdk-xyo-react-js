import { useWeakModuleFromNode } from '@xyo-network/react-node'
import type { NodeSingular } from 'cytoscape'
import { useMemo } from 'react'

import { useCytoscapeElements } from './useCytoscapeElements.ts'

export const useNewElements = (selectedElement?: NodeSingular) => {
  const selectedAddress = useMemo(() => {
    const { address: selectedAddress } = selectedElement?.data() ?? {}
    return selectedAddress
  }, [selectedElement])

  const [mod] = useWeakModuleFromNode(selectedAddress)
  const newElements = useCytoscapeElements(mod)

  return newElements
}
