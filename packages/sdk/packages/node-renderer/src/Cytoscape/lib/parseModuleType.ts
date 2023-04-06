import { CyNodeModuleTypes } from './CyNodeModuleTypes'

export const parseModuleType = (queries?: string[]): CyNodeModuleTypes => {
  let type: CyNodeModuleTypes = 'module'
  if (queries) {
    for (let i = 0; i < queries.length; i++) {
      if (queries[i].includes('archivist')) {
        type = 'archivist'
        break
      }
      if (queries[i].includes('bridge')) {
        type = 'bridge'
        break
      }
      if (queries[i].includes('diviner')) {
        type = 'diviner'
        break
      }
      if (queries[i].includes('node')) {
        type = 'node'
        break
      }
      if (queries[i].includes('sentinel')) {
        type = 'sentinel'
        break
      }
      if (queries[i].includes('witness')) {
        type = 'witness'
        break
      }
      type = 'module'
    }
    return type
  }
  return 'module'
}
