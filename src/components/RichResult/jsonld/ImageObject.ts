/* eslint-disable import/no-cycle */
import MediaObject from './MediaObject'
import Text from './Text'

interface ImageObject extends MediaObject {
  caption?: Text
  exifData?: Text
  representativeOfPage?: boolean
  thumbnail?: ImageObject
}

export default ImageObject
