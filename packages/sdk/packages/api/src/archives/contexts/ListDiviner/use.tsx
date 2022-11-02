import { useContextEx } from '@xyo-network/react-shared'

import { ArchiveListApiDivinerContext } from './Context'

export const useArchiveListApiDiviner = (required?: boolean) => useContextEx(ArchiveListApiDivinerContext, 'ArchiveListApiDiviner', required)
