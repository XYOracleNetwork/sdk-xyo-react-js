import { useAsyncEffect } from '@xylabs/react-async-effect'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { ModuleInstance } from '@xyo-network/module-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeElements } from '../../../Cytoscape'

export const useCytoscapeElements = (module?: ModuleInstance | null) => {
  const [elements, setElements] = useState<ElementDefinition[]>([])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (module) {
        const newElements = (await CytoscapeElements.buildElements(module)) ?? []
        setElements(newElements)
      }
    },
    [module],
  )

  useEffect(() => {
    let attachedListener: EventUnsubscribeFunction | undefined
    let detachedListener: EventUnsubscribeFunction | undefined

    if (module && isNodeInstance(module)) {
      attachedListener = module.on('moduleAttached', async () => {
        const newElements = (await CytoscapeElements.buildElements(module)) ?? []
        setElements(newElements)
      })
      detachedListener = module.on('moduleDetached', async () => {
        const newElements = (await CytoscapeElements.buildElements(module)) ?? []
        setElements(newElements)
      })
    }

    return () => {
      attachedListener?.()
      detachedListener?.()
    }
  }, [module])

  return elements
}
