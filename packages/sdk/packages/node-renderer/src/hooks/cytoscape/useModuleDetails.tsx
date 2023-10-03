import { usePromise } from '@xylabs/react-promise'
import { ModuleInstance } from '@xyo-network/module'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useModuleDetails = (rootModule?: ModuleInstance | null, onFoundModule?: () => void) => {
  const { cy } = useCytoscapeInstance()
  const [moduleAddress, setModuleAddress] = useState<string | null>()

  const [foundModule] = usePromise(async () => {
    if (moduleAddress === null) return null
    if (moduleAddress && rootModule) {
      const foundModule = await rootModule.resolve(moduleAddress)
      return foundModule ? foundModule : null
    }
  }, [moduleAddress, rootModule])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (moduleAddress === null) {
        cy?.center()
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cy?.center(), 100)
      } else if (foundModule && cy) {
        const moduleNode = cy.nodes(`[id="${moduleAddress}"]`)
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cy.center(moduleNode), 100)
      }
    })

    const container = cy?.container()
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
    const moduleNode = cy?.nodes(`[id="${address}"]`)
    const rootModuleNode = cy?.nodes(`[id="${rootModule?.address}"]`)
    const notModuleNode = cy?.nodes(`[id != "${address}"]`)
    if (address) {
      moduleNode?.toggleClass('rootNode', true)
      notModuleNode?.toggleClass('rootNode', false)
    } else {
      notModuleNode?.toggleClass('rootNode', false)
      rootModuleNode?.toggleClass('rootNode', true)
    }
    setModuleAddress(address)
  }

  return { module: foundModule, onModuleDetails }
}
