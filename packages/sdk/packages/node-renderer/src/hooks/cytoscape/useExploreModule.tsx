import { usePromise } from '@xylabs/react-promise'
import { ModuleInstance } from '@xyo-network/module'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useExploreModule = (rootModule?: ModuleInstance | null, onFoundModule?: () => void) => {
  const { cy } = useCytoscapeInstance()
  const [exploreAddress, setExploreAddress] = useState<string | null>()

  const [exploreModule] = usePromise(async () => {
    if (exploreAddress === null) return null
    if (exploreAddress && rootModule) {
      const module = await rootModule.resolve(exploreAddress)
      return module ? module : null
    }
  }, [exploreAddress, rootModule])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (exploreAddress === null) {
        cy?.center()
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cy?.center(), 100)
      } else if (exploreModule && cy) {
        const exploreNode = cy.nodes(`[id="${exploreAddress}"]`)
        // cytoscape tries to center prematurely without it :(
        setTimeout(() => cy.center(exploreNode), 100)
      }
    })

    const container = cy?.container()
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (container) resizeObserver.unobserve(container)
    }
  }, [cy, exploreAddress, exploreModule, rootModule?.address])

  useEffect(() => {
    if (exploreModule) {
      onFoundModule?.()
    }
  }, [cy, exploreAddress, exploreModule, onFoundModule])

  const onExploreAddress = (address?: string | null) => {
    const exploreNode = cy?.nodes(`[id="${address}"]`)
    const rootModuleNode = cy?.nodes(`[id="${rootModule?.address}"]`)
    const notExploreNode = cy?.nodes(`[id != "${address}"]`)
    if (address) {
      exploreNode?.toggleClass('rootNode', true)
      notExploreNode?.toggleClass('rootNode', false)
    } else {
      notExploreNode?.toggleClass('rootNode', false)
      rootModuleNode?.toggleClass('rootNode', true)
    }
    setExploreAddress(address)
  }

  return { exploreModule, onExploreAddress }
}
