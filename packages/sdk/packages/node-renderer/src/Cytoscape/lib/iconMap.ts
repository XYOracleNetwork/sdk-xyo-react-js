import { CyNodeModuleTypes } from './CyNodeModuleTypes.js'

export const generateIconMap: () => Record<CyNodeModuleTypes, string> = () => ({
  archivist: '',
  bridge: '',
  diviner: '',
  // eslint-disable-next-line id-denylist
  module: '',
  node: '',
  sentinel: '',
  witness: '',
})
