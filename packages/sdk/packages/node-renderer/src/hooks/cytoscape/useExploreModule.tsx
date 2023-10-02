import { usePromise } from '@xylabs/react-promise'
import { ModuleInstance } from '@xyo-network/module'
import { useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../contexts'

export const useExploreModule = (rootModule?: ModuleInstance | null, onFoundModule?: () => void) => {
  const { cy } = useCytoscapeInstance()
  const [exploreAddress, setExploreAddress] = useState<string>()

  const [exploreModule] = usePromise(async () => {
    if (exploreAddress && rootModule) {
      const module = await rootModule.resolve(exploreAddress)
      return module ? module : null
    }
  }, [exploreAddress, rootModule])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (exploreModule && cy) {
        const exploreNode = cy?.nodes(`node[id="${exploreAddress}"]`)
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
  }, [cy, exploreAddress, exploreModule])

  useEffect(() => {
    if (exploreModule) {
      onFoundModule?.()
    }
  }, [cy, exploreAddress, exploreModule, onFoundModule])

  const onExploreAddress = (address?: string) => {
    setExploreAddress(address)
  }

  return { exploreModule, onExploreAddress }
}
