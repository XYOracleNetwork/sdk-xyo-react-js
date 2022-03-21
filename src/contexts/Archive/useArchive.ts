import { useContext } from 'react'

import { XyoArchiveContext } from './Context'

export const useArchive = () => {
  return { ...useContext(XyoArchiveContext) }
}
