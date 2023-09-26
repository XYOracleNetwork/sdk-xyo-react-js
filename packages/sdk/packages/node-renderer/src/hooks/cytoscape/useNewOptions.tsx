import { CytoscapeOptions, ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

export const useNewOptions = (options: CytoscapeOptions = {}, newElements: ElementDefinition[] = []) => {
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

  return updatedOptions ?? options
}
