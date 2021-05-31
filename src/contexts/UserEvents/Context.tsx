import React from 'react'

import { UserEventHandler } from '../../lib'

interface Props {
  userEvents?: UserEventHandler<any>
}

const Context = React.createContext<Props>({})
export default Context
