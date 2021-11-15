import { getApiStage } from '@xylabs/sdk-js'

const get = () => {
  return getApiStage(document.location.hostname)
}

export default get
