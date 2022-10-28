import { WithChildren } from '@xylabs/react-shared'
import { XyoArchive } from '@xyo-network/api'
import { useEffect, useState } from 'react'

import { ArchivesContext } from './Context'
import { ArchiveListApiDivinerProvider, useDivineArchiveList } from './ListDiviner'

export const ArchivesProviderInner: React.FC<WithChildren> = ({ children }) => {
  const [archives, setArchives] = useState<XyoArchive[]>([{ archive: 'temp' }])

  const [archiveList, error, refreshList] = useDivineArchiveList()

  useEffect(() => {
    if (archiveList?.length) {
      setArchives(archiveList.map((archive) => archive.archive))
    }
  }, [archiveList])

  return <ArchivesContext.Provider value={{ archives, error, provided: true, refreshList, setArchives }}>{children}</ArchivesContext.Provider>
}

export const ArchivesProvider: React.FC<WithChildren> = ({ children }) => {
  return (
    <ArchiveListApiDivinerProvider>
      <ArchivesProviderInner>{children}</ArchivesProviderInner>
    </ArchiveListApiDivinerProvider>
  )
}
