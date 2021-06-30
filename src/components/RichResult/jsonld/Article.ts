/* eslint-disable import/no-cycle */
import CreativeWork from './CreativeWork'
import Integer from './Integer'
import Text from './Text'

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
