import type { ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ConcentricLayout } from '../../Cytoscape/index.ts'
import { useCytoscapeElements } from './elements/index.ts'
import { useCytoscapeOptions } from './useCytoscapeOptions.ts'
import { useCytoscapeStyle } from './useCytoscapeStyle.tsx'

export const useRelationalGraphOptions = (mod?: WeakRef<ModuleInstance>) => {
  const [hideLabels, setHideLabels] = useState(true)

  const handleToggleLabels = () => {
    setHideLabels(oldValue => !oldValue)
  }

  const elements = useCytoscapeElements(mod)
  const style = useCytoscapeStyle(hideLabels)
  const options = useCytoscapeOptions(elements, style, ConcentricLayout)

  return { handleToggleLabels, hideLabels, options }
}
