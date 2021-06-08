import { UserEventHandler } from '@xylabs/pixel'
import React from 'react'

interface Props {
  userEvents?: UserEventHandler<any>
}

const Context = React.createContext<Props>({})
export default Context
