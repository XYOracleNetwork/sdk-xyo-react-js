import DripResult from './Result'

interface DripBaseData extends Record<string, unknown> {
  failure?: (result?: DripResult) => void
  success?: (result?: DripResult) => void
}

export default DripBaseData
