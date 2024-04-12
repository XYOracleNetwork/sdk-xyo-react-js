import { usePromise } from '@xylabs/react-promise'
import { ModuleInstance } from '@xyo-network/module-model'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useModuleDetails = (rootModule?: ModuleInstance | null, onFoundModule?: () => void) => {
  const { cy } = useCytoscapeInstance()
  const [moduleAddress, setModuleAddress] = useState<string | null>()

  const [foundModule] = usePromise(async () => {
    if (moduleAddress === null) return null
    if (moduleAddress && rootModule) {
      const foundModule = await rootModule.resolve(moduleAddress)
      return foundModule ?? null
    }
  }, [moduleAddress, rootModule])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const cyInstance = cy?.deref()
      if (moduleAddress === null) {
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cyInstance?.center(), 100)
      } else if (foundModule && cy) {
        const node = cyInstance?.nodes(`[id="${moduleAddress}"]`)?.[0]
        // cy.pan(newPan)
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cyInstance?.center(node), 100)
      }
    })

    const cyInstance = cy?.deref()
    const container = cyInstance?.container()
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (container) resizeObserver.unobserve(container)
    }
  }, [cy, moduleAddress, foundModule, rootModule?.address])

  useEffect(() => {
    if (foundModule) {
      onFoundModule?.()
    }
  }, [cy, moduleAddress, foundModule, onFoundModule])

  const onModuleDetails = (address?: string | null) => {
    const cyInstance = cy?.deref()
    const moduleNode = cyInstance?.nodes(`[id="${address}"]`)
    const rootModuleNode = cyInstance?.nodes(`[id="${rootModule?.address}"]`)
    const foundModuleNode = cyInstance?.nodes(`[id="${foundModule?.address}"]`)
    const notModuleNode = cyInstance?.nodes(`[id != "${address}"]`)

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

  return { module: foundModule, onModuleDetails }
}
