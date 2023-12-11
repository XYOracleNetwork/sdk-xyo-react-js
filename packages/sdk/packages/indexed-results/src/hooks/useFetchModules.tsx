import { usePromise } from "@xylabs/react-promise"
import { DivinerInstance, isDivinerInstance } from "@xyo-network/diviner-model"
import { useArchivistFromNode } from "@xyo-network/react-archivist"
import { useProvidedNode } from "@xyo-network/react-node"
import { IndexedSources } from "../interfaces"

export const useFetchModules = (config: IndexedSources) => {
  const { archivist: archivistName, diviners: divinerNames } = config
  const [node] = useProvidedNode()

  const [archivist] = useArchivistFromNode(archivistName)
  const [diviners] = usePromise<DivinerInstance[]>(async () => {
    const resolvedDiviners = node ? await node.resolve({ name: divinerNames }) : []
    return resolvedDiviners.filter((module) => isDivinerInstance(module)) as DivinerInstance[]
  }, [divinerNames, node])

  return {
    archivist,
    diviners,
  }
}