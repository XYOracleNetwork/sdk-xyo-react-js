import { getApiStage } from '@xyo-network/sdk-xyo-js'

const get = () => {
  return getApiStage(document.location.hostname)
}

export default get
