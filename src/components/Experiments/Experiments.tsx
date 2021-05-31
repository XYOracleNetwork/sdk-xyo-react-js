import { Log } from '@xyo-network/sdk-xyo-js'
import React, { ReactElement, useContext } from 'react'

import { UserEventsContext } from '../../contexts'
import { getLocalStorageObject, isLocalhost, setLocalStorageObject } from '../../lib'
import { ExperimentProps } from './Experiment'

const defaultLocalStorageKey = 'testData'

const experimentsTestData: { [index: string]: string } = {}
let outcomes: { [index: string]: number } = {} //prevent multi-outcome

const saveOutcomes = () => {
  setLocalStorageObject('outcomes', outcomes)
}

const loadOutcomes = () => {
  outcomes = getLocalStorageObject('outcomes')
}

const mergeData = (data: { [index: string]: string }, log?: Log) => {
  const dataArray: string[] = []
  for (const key in data) {
    dataArray.push(`${key}-${data[key]}`)
  }
  log?.info('MergeData', dataArray.join('|'))
  return dataArray.join('|')
}

type Props = {
  children: ReactElement<ExperimentProps>[] | ReactElement<ExperimentProps>
  localStorageProp?: string | boolean
  name: string
  testStarted?: () => Promise<void>
}

const missingKeyError = new Error('Experiment Elements must have Keys')

const makeChildrenArray = (children: ReactElement<ExperimentProps>[] | ReactElement<ExperimentProps>) => {
  if (Array.isArray(children)) {
    return children as ReactElement<ExperimentProps>[]
  } else {
    return [children]
  }
}

const Experiments: React.FC<Props> = (props) => {
  const { name, children, testStarted, localStorageProp = true } = props
  const userEventsConntext = useContext(UserEventsContext)
  const { userEvents } = userEventsConntext
  loadOutcomes()

  const localStorageKey =
    localStorageProp === true
      ? defaultLocalStorageKey
      : typeof localStorageProp === 'string'
      ? localStorageProp ?? defaultLocalStorageKey
      : ''

  const childList = makeChildrenArray(children)

  let totalWeight = 0
  for (const child of childList) {
    totalWeight += child.props.weight
  }
  const firstTime = outcomes[name] === undefined
  let targetWeight = outcomes[name] ?? Math.random() * totalWeight
  outcomes[name] = targetWeight
  saveOutcomes()
  for (const child of childList) {
    targetWeight -= child.props.weight
    if (targetWeight <= 0) {
      if (child.key) {
        experimentsTestData[name] = child.key?.toString()
      } else {
        throw missingKeyError
      }
      if (child.key && firstTime) {
        if (localStorageProp !== false) {
          localStorage.setItem(localStorageKey, mergeData(experimentsTestData))
        }
        if (!isLocalhost) {
          userEvents?.testStarted({})
          testStarted?.()
        }
      }
      return child
    }
  }
  throw new Error('Experiment Choice Failed')
}

export default Experiments
