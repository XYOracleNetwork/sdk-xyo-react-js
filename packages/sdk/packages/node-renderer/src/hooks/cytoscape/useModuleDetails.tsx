import { usePromise } from '@xylabs/react-promise'
import { ModuleInstance } from '@xyo-network/module-model'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts/index.js'

export const useModuleDetails = (rootModule?: WeakRef<ModuleInstance> | null, onFoundModule?: () => void) => {
  const { cy } = useCytoscapeInstance()
  const [moduleAddress, setModuleAddress] = useState<string | null>()

  const [foundModule] = usePromise(async () => {
    if (moduleAddress === null) return null
    const rootModuleInstance = rootModule?.deref()
    if (moduleAddress && rootModuleInstance) {
      const foundModule = await rootModuleInstance.resolve(moduleAddress)
      return foundModule ?? null
    }
  }, [moduleAddress, rootModule])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (moduleAddress === null) {
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => {
          cy?.deref()?.center()
        }, 100)
      } else if (foundModule && cy) {
        const node = cy?.deref()?.nodes(`[id="${moduleAddress}"]`)?.[0]
        // cy.pan(newPan)
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => {
          cy?.deref()?.center(node)
        }, 100)
      }
    })

    const container = cy?.deref()?.container()
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (container) resizeObserver.unobserve(container)
    }
  }, [cy, moduleAddress, foundModule, rootModule])

  useEffect(() => {
    if (foundModule) {
      onFoundModule?.()
    }
  }, [cy, moduleAddress, foundModule, onFoundModule])

  const onModuleDetails = (address?: string | null) => {
    const moduleNode = cy?.deref()?.nodes(`[id="${address}"]`)
    const rootModuleNode = cy?.deref()?.nodes(`[id="${rootModule?.deref()?.address}"]`)
    const foundModuleNode = cy?.deref()?.nodes(`[id="${foundModule?.address}"]`)
    const notModuleNode = cy?.deref()?.nodes(`[id != "${address}"]`)

    if (address) {
      // address was passed so we set the node to active styles
      moduleNode?.toggleClass('activeNode', true)
      notModuleNode?.toggleClass('activeNode', false)
    } else {
      // no address was passes so we reset the state
      notModuleNode?.toggleClass('activeNode', false)
      const activeNode = foundModuleNode?.length ? foundModuleNode : rootModuleNode
      activeNode?.toggleClass('activeNode', true)
    }
    setModuleAddress(address)
  }

  return { mod: foundModule, onModuleDetails }
}
