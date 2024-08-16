import type { ReactElement } from 'react'

import { useAppSettings } from '../contexts/index.ts'

export const Developer: React.FC<{ children: ReactElement }> = ({ children = null }) => {
  const { developerMode } = useAppSettings()

  return developerMode ? children : null
}
