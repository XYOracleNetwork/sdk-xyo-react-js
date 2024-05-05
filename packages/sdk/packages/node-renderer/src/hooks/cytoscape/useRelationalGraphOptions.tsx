import { ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ConcentricLayout } from '../../Cytoscape'
import { useCytoscapeElements } from './elements'
import { useCytoscapeOptions } from './useCytoscapeOptions'
import { useCytoscapeStyle } from './useCytoscapeStyle'

export const useRelationalGraphOptions = (mod?: WeakRef<ModuleInstance>) => {
  const [hideLabels, setHideLabels] = useState(true)

  const handleToggleLabels = () => {
    setHideLabels((oldValue) => !oldValue)
  }

  const elements = useCytoscapeElements(mod)
  const style = useCytoscapeStyle(hideLabels)
  const options = useCytoscapeOptions(elements, style, ConcentricLayout)

  return { handleToggleLabels, hideLabels, options }
}
