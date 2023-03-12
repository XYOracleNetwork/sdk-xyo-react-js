import { RootStorageArchivist } from './ModuleNames'

export const GlobalNodeOffsetPath = '15'

export const RemoteNodeOffsetPaths: Record<string, string> = {
  Kerplunk: '112',
  Local: '111',
  Main: '113',
}

export const RemoteNodeArchivistOffsetPaths: Record<string, Record<string, string>> = {
  Kerplunk: {
    MemoryNode: '117',
    [RootStorageArchivist]: '119',
  },
  Local: {
    MemoryNode: '114',
    [RootStorageArchivist]: '116',
  },
  Main: {
    MemoryNode: '120',
    [RootStorageArchivist]: '122',
  },
}
