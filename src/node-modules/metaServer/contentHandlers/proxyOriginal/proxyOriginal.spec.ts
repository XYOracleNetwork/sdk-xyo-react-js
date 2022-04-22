import { readFile } from 'fs/promises'

import { getServer } from '../../test'

describe('proxyOriginal', () => {
  it('Serves up the original content unmodified', async () => {
    // Serve up this directory
    const server = getServer(__dirname)
    const serverRelativePath = __filename.split(__dirname)[1]
    expect(serverRelativePath).toBeTruthy()

    // Get this file from the server
    const response = await server.get(serverRelativePath).expect(200)
    expect(response.body).toBeTruthy()
    const actual = response.body.toString()
    expect(actual).toBeTruthy()

    // Get this file by reading it directly from the filesystem
    const expected = await readFile(__filename, { encoding: 'utf-8' })
    expect(expected).toBeTruthy()

    // Compare served up version with actual for equality
    expect(actual).toBe(expected)
  })
})
