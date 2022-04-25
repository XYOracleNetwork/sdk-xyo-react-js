import { Server } from 'http'
import { join } from 'path'
import { agent, SuperTest, Test } from 'supertest'

import { getApp, server } from '../server'

test('Spec files require tests', () => {
  expect(true).toBeTruthy()
})

const defaultBaseDir = join(__dirname, 'staticFileServeDir')

export const getServer = (baseDir = defaultBaseDir): SuperTest<Test> => {
  return agent(getApp(baseDir))
}

export const getServerOnPort = (port: number, baseDir = defaultBaseDir): [Server, SuperTest<Test>] => {
  const activeServer = server(port, baseDir)
  return [activeServer, agent(activeServer)]
}
