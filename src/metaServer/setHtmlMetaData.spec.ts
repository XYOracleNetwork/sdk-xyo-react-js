import { sampleMeta } from './sample.spec'
import { setHtmlMetaData } from './setHtmlMetaData'

describe('metaServer', () => {
  it('process Example config', async () => {
    const testHtml = '<html/>'
    const newHtml = await setHtmlMetaData('/', testHtml, sampleMeta)
    expect(newHtml.length).toBeGreaterThan(testHtml.length)
  })
})
