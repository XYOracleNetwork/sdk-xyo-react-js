import { ModuleInstance } from '@xyo-network/module'
import { useState } from 'react'

import { ColaLayout } from '../../Cytoscape'
import { useCytoscapeElements } from './useCytoscapeElements'
import { useCytoscapeOptions } from './useCytoscapeOptions'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useRelationalGraphOptions = (module?: ModuleInstance) => {
  const [hideLabels, setHideLabels] = useState(false)

  const handleToggleLabels = () => {
    setHideLabels((oldValue) => !oldValue)
  }

  const elements = useCytoscapeElements(module)
  const style = useCytoscapeStyle(hideLabels)
  const options = useCytoscapeOptions(elements, style, ColaLayout)

  return { handleToggleLabels, options }
}
