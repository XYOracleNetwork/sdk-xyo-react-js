import { ModuleInstance } from '@xyo-network/module'
import { useState } from 'react'

import { ConcentricLayout } from '../../Cytoscape'
import { useCytoscapeElements } from './elements/useCytoscapeElements'
import { useCytoscapeOptions } from './useCytoscapeOptions'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useRelationalGraphOptions = (module?: ModuleInstance) => {
  const [hideLabels, setHideLabels] = useState(true)

  const handleToggleLabels = () => {
    setHideLabels((oldValue) => !oldValue)
  }

  const elements = useCytoscapeElements(module)
  const style = useCytoscapeStyle(hideLabels)
  const options = useCytoscapeOptions(elements, style, ConcentricLayout)

  return { handleToggleLabels, hideLabels, options }
}
