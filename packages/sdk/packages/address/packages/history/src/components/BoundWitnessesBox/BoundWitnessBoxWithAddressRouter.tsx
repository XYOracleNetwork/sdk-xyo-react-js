import { useXyoEvent } from '@xyo-network/react-event'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useHashSelectionHistory } from '../../hooks'
import { BoundWitnessesBox } from './BoundWitnessesBox'

export const BoundWitnessBoxWithAddressRouter = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const { clearHistory } = useHashSelectionHistory()

  const [listenerRef] = useXyoEvent<HTMLDivElement>((noun, _verb, data) => {
    if (noun === 'address' && data) {
      clearHistory?.()
      navigate(`/addresses/${data}`)
    }
  }, ref)

  return <BoundWitnessesBox ref={listenerRef} />
}
