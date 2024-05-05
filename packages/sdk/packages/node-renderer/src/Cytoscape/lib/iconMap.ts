import { CyNodeModuleTypes } from './CyNodeModuleTypes'

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
