import { join } from 'path'
import { agent, SuperTest, Test } from 'supertest'

import { getApp } from '../server'

test('Spec files require tests', () => {
  expect(true).toBeTruthy()
})
test.skip('Must have APP_PORT ENV VAR defined', () => {
  expect(process.env.APP_PORT).toBeTruthy()
})

const defaultBaseDir = join(__filename.split('src')[0], 'src')

export const getServer = (baseDir = defaultBaseDir): SuperTest<Test> => {
  return agent(getApp(baseDir))
}
