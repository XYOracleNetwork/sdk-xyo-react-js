import { ReactElement } from 'react'

import { useAppSettings } from '../contexts/index.js'

export const Developer: React.FC<{ children: ReactElement }> = ({ children = null }) => {
  const { developerMode } = useAppSettings()

  return developerMode ? children : null
}
