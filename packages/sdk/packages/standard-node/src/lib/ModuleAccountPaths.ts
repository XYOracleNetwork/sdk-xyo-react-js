import { DevelopArchivist, RootStorageArchivist } from './ModuleNames'

export const GlobalNodeOffsetPath = '15'

export const RemoteNodeOffsetPaths: Record<string, string> = {
  Kerplunk: '112',
  Local: '111',
  Main: '113',
}

export const RemoteNodeArchivistOffsetPaths: Record<string, Record<string, string>> = {
  Kerplunk: {
    [DevelopArchivist]: '118',
    MemoryNode: '117',
    [RootStorageArchivist]: '119',
  },
  Local: {
    [DevelopArchivist]: '115',
    MemoryNode: '114',
    [RootStorageArchivist]: '116',
  },
  Main: {
    [DevelopArchivist]: '121',
    MemoryNode: '120',
    [RootStorageArchivist]: '122',
  },
}
