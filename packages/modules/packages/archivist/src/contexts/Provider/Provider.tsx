import { ArchivistModule } from '@xyo-network/archivist'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { ArchivistContext } from '../Context'

/** @deprecated use hooks instead */
export type ArchivistProviderProps = ContextExProviderProps<{
  archivist?: ArchivistModule
}>

/** @deprecated use hooks instead */
// eslint-disable-next-line deprecation/deprecation
export const ArchivistProvider: React.FC<ArchivistProviderProps> = ({ archivist: archivistProp, required = false, children }) => {
  const [archivist, setArchivist] = useState<ArchivistModule>()

  useEffect(() => {
    setArchivist(archivistProp)
  }, [archivistProp])

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
