/* eslint-disable @delagen/deprecation/deprecation */
import { UserEventHandler } from '@xylabs/pixel'
import React from 'react'

interface Props {
  userEvents?: UserEventHandler<unknown>
}
/** @deprecated Moved to @xylabs/sdk-react */
const Context = React.createContext<Props>({})
export default Context
