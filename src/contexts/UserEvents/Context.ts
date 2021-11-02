import { UserEventHandler } from '@xylabs/pixel'
import React from 'react'

interface Props {
  userEvents?: UserEventHandler<unknown>
}

const Context = React.createContext<Props>({})
export default Context
