let count = 0

self.onmessage = (event) => {
  console.log('Inside Worker', event)
  count++
  self.postMessage(count.toString())
}
