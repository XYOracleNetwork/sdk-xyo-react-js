import { readFile } from 'fs/promises'

import { getServer } from '../../test'

describe('proxyOriginal', () => {
  it('Serves up the original content unmodified', async () => {
    // Serve up this project root directory
    const server = getServer()
    const projectRelativePath = __filename.split('src')[1]
    expect(projectRelativePath).toBeTruthy()
    // Get this file via server
    const response = await server.get(projectRelativePath).expect(200)
    expect(response.body).toBeTruthy()
    const actual = response.body.toString()
    expect(actual).toBeTruthy()
    // Get this file via server
    const expected = await readFile(__filename, { encoding: 'utf-8' })
    expect(expected).toBeTruthy()
    // Compare served up version with actual for equality
    expect(actual).toBe(expected)
  })
})
