import { agent, SuperTest, Test } from 'supertest'

import { getApp } from '../server'

test('Spec files require tests', () => {
  expect(true).toBeTruthy()
})
test.skip('Must have APP_PORT ENV VAR defined', () => {
  expect(process.env.APP_PORT).toBeTruthy()
})

export const getServer = (): SuperTest<Test> => {
  return agent(getApp())
}
