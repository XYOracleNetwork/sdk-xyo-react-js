import { useAsyncEffect } from '@xylabs/react-async-effect'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { ModuleInstance } from '@xyo-network/module-model'
import { isNodeInstance } from '@xyo-network/node-model'
import { ElementDefinition } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeElements } from '../../../Cytoscape/index.ts'

export const useCytoscapeElements = (mod?: WeakRef<ModuleInstance> | null) => {
  const [elements, setElements] = useState<ElementDefinition[]>([])

  useAsyncEffect(

    async () => {
      const moduleInstance = mod?.deref()
      if (moduleInstance) {
        const newElements = (await CytoscapeElements.buildElements(moduleInstance)) ?? []
        setElements(newElements)
      }
    },
    [mod],
  )

  useEffect(() => {
    let attachedListener: EventUnsubscribeFunction | undefined
    let detachedListener: EventUnsubscribeFunction | undefined

    if (mod && isNodeInstance(mod)) {
      attachedListener = mod.on('moduleAttached', async () => {
        const newElements = (await CytoscapeElements.buildElements(mod)) ?? []
        setElements(newElements)
      })
      detachedListener = mod.on('moduleDetached', async () => {
        const newElements = (await CytoscapeElements.buildElements(mod)) ?? []
        setElements(newElements)
      })
    }

    return () => {
      attachedListener?.()
      detachedListener?.()
    }
  }, [mod])

  return elements
}
