import { useContextEx } from '@xylabs/react-shared'

import { PayloadListContext } from './Context.tsx'

export const usePayloadList = () => useContextEx(PayloadListContext, 'PayloadList', true)
