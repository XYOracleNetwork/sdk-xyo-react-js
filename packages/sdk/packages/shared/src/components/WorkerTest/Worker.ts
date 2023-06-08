interface Myself {
  count: number
}

type ISelf = Window & typeof globalThis & Myself

self.onmessage = (event) => {
  const mySelf = self as unknown as ISelf
  mySelf.count = mySelf.count || 0
  console.log('Inside Worker', event)
  mySelf.count++
  self.postMessage(mySelf.count.toString())
}
