import { getServer } from '../test'

describe('Server', () => {
  it('starts up', async () => {
    const server = getServer()
    await server.get('/').expect(200)
  })
})
