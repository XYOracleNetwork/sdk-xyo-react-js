import React from 'react'

import InvertableTheme from './InvertableTheme'

const InvertableThemeContext = React.createContext<InvertableTheme>({
  options: {},
})

export default InvertableThemeContext
