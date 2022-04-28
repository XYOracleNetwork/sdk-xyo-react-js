import { Meta } from '@xyo-network/sdk-meta'

import { setHtmlMetaData } from './setHtmlMetaData'

const testHtml = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Own your piece of XYO's Decentralized Digital World!" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
  <title>XYO 2.0</title>
  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans|Lexend+Deca|Rock+Salt|Source+Code+Pro&display=swap"
    rel="stylesheet">
  <meta property="og:url" content="https://explore.xyo.network" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="XYO 2.0 Explore" />
  <meta property="og:description" content="Explore the XYO 2.0 Blockchain" />
  <meta property="og:image" content="https://explore.xyo.network/meta-image-explore.jpg" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content="https://explore.xyo.network/meta-image-explore.jpg" />
  <meta property="twitter:site" content="@OfficialXYO" />
  <meta property="twitter:creator" content="@OfficialXYO" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-795QBPW744"></script>
  <script>function gtag() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "G-795QBPW744")</script>
  <style>
    html {
      overflow-y: auto;
      overflow-x: hidden
    }

    #root,
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0
    }
  </style>
  <script defer="defer" src="/static/js/main.ae7f7033.js"></script>
  <link href="/static/css/main.026e3fe6.css" rel="stylesheet">
</head>

<body style="padding:0;margin:0;overflow-x:hidden"><noscript><iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-W2TFNXL" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript><noscript>You need to enable JavaScript to run this
    app.</noscript>
  <div id="root"></div>
</body>

</html>
`
const title = 'New Title'
const testMeta: Meta = {
  description: 'New Description',
  og: {
    image: 'https://www.fillmurray.com/200/300',
    title,
    type: 'website',
    url: 'https://test.xyo.network',
  },
  title,
  twitter: {
    card: 'summary_large_image',
    image: { url: 'https://www.placecage.com/400/300' },
    title,
  },
}

const verifyHtmlContainsMeta = (html: string, path: string) => {
  expect(html.length).toBeGreaterThan(testHtml.length)
  expect(html).toContain(testMeta.title)
  expect(html).toContain(testMeta.description)
  expect(html).toContain(testMeta.og?.image)
  expect(html).toContain(testMeta.og?.title)
  expect(html).toContain(testMeta.og?.type)
  expect(html).toContain(path)
  expect(html).toContain(testMeta.twitter?.card)
  expect(html).toContain(testMeta.twitter?.image?.url)
  expect(html).toContain(testMeta.twitter?.title)
}

describe('setHtmlMetaData', () => {
  it('for non-payload URL sets standard meta fields', async () => {
    const path = '/'
    const newHtml = await setHtmlMetaData(path, testHtml, testMeta)
    verifyHtmlContainsMeta(newHtml, path)
  })
  it('for payload URL', async () => {
    const hash = '62378096c541bda4a150643314fb0ed85d6f964023452f586d0e5c74db08d852'
    const path = `http://aws-alb-123456789.us-east-1.elb.amazonaws.com:80/archive/temp/payload/hash/${hash}`
    const newHtml = await setHtmlMetaData(path, testHtml, testMeta)
    verifyHtmlContainsMeta(newHtml, path)
    expect(newHtml).toContain(hash)
  })
})
