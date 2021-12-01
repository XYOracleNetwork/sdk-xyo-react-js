/* eslint-disable @delagen/deprecation/deprecation */
/* eslint-disable import/no-cycle */
import CreativeWork from './CreativeWork'
import Integer from './Integer'
import Text from './Text'

/** @deprecated Moved to @xylabs/sdk-react */
interface Article extends CreativeWork {
  articleBody?: Text
  articleSection?: Text
  backstory?: CreativeWork | Text
  pageEnd?: Integer | Text
  pageStart?: Integer | Text
  pagination?: Text
  speakable?: unknown | URL
  wordCount?: Integer
}

export default Article
