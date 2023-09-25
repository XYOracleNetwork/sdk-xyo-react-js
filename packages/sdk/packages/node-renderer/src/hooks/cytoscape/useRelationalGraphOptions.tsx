import { ModuleInstance } from '@xyo-network/module'
import { CytoscapeOptions } from 'cytoscape'

import { useCytoscapeElements } from './useCytoscapeElements'
import { useCytoscapeOptions } from './useCytoscapeOptions'

export const useRelationalGraphOptions = (module?: ModuleInstance): CytoscapeOptions => {
  const elements = useCytoscapeElements(module)
  const options = useCytoscapeOptions(elements)

  return options
}
