import { PayloadArchivist, XyoArchivist } from '@xyo-network/archivist'
import { useNode } from '@xyo-network/react-node'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ArchivistContext } from '../Context'

export type ArchivistProviderProps = ContextExProviderProps<{
  archivist?: XyoArchivist
}>

export const ArchivistProvider: React.FC<ArchivistProviderProps> = ({ archivist: archivistProp, required = false, children }) => {
  const [archivist, setArchivist] = useState<XyoArchivist>()

  const [node] = useNode()

  useEffect(() => {
    setArchivist(archivistProp)
  }, [archivistProp])

  useEffect(() => {
    if (archivist) {
      node?.register(archivist)
    }
  }, [node, archivist])

  return (
    <ArchivistContext.Provider
      value={{
        archivist: archivist !== archivistProp ? undefined : archivist,
        provided: true,
        setArchivist,
      }}
    >
      {archivist ? children : required ? null : children}
    </ArchivistContext.Provider>
  )
}
