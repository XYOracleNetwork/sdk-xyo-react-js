import DripResult from './Result'

interface DripBaseData {
  failure?: (result?: DripResult) => void
  success?: (result?: DripResult) => void
}

export default DripBaseData
