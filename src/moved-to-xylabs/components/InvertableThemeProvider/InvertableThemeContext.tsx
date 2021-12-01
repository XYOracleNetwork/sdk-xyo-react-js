/* eslint-disable @delagen/deprecation/deprecation */
import React from 'react'

import InvertableTheme from './InvertableTheme'

/** @deprecated Moved to @xylabs/sdk-react */
const InvertableThemeContext = React.createContext<InvertableTheme>({
  options: {},
})

export default InvertableThemeContext
