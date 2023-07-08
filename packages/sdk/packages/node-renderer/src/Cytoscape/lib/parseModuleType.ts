import { CyNodeModuleTypes } from './CyNodeModuleTypes'

export const parseModuleType = (schema?: string): CyNodeModuleTypes => {
  let type: CyNodeModuleTypes = 'module'
  if (schema) {
    if (schema.includes('archivist')) {
      type = 'archivist'
    } else if (schema.includes('bridge')) {
      type = 'bridge'
    } else if (schema.includes('diviner')) {
      type = 'diviner'
    } else if (schema.includes('node')) {
      type = 'node'
    } else if (schema.includes('sentinel')) {
      type = 'sentinel'
    } else if (schema.includes('witness')) {
      type = 'witness'
    } else {
      type = 'module'
    }
  }
  return type
}
