import { getServer } from '../test'

describe('Server', () => {
  it('starts up', async () => {
    const server = getServer()
    // TODO: Make default test pass with 200
    await server.get('/').expect(500)
  })
})
