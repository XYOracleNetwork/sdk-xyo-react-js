/* eslint-disable import/no-cycle */
import CreativeWork from './CreativeWork'
import Text from './Text'
import URL from './URL'

interface MediaObject extends CreativeWork {
  contentSize?: Text
  contentUrl?: URL
  height?: unknown
  width?: unknown
}

export default MediaObject
