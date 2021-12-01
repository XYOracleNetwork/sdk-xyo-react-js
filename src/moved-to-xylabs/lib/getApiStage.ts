/* eslint-disable @delagen/deprecation/deprecation */
import { getApiStage } from '@xylabs/sdk-js'

/** @deprecated Moved to @xylabs/sdk-react */
const get = () => {
  return getApiStage(document.location.hostname)
}

export default get
