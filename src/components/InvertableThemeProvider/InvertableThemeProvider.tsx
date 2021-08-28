import { responsiveFontSizes, ScopedCssBaseline, ThemeOptions, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import clone from 'lodash/clone'
import React, { useContext } from 'react'

import InvertableThemeContext from './InvertableThemeContext'

interface InvertableThemeProviderProps {
  dark?: boolean
  invert?: boolean
  noResponsiveFonts?: boolean
  options?: ThemeOptions
}

const InvertableThemeProvider: React.FC<InvertableThemeProviderProps> = (props) => {
  const contextInvertableTheme = useContext(InvertableThemeContext)
  const { children, dark, invert = false, noResponsiveFonts } = props
  const { options = clone(contextInvertableTheme.options) } = props

  options.palette = options.palette ?? {}

  if (invert) {
    options.palette.mode = options.palette.mode === 'dark' ? 'light' : 'dark'
  }

  if (dark !== undefined) {
    options.palette.mode = dark ? 'dark' : 'light'
  }

  let theme = createTheme(options)

  if (!noResponsiveFonts) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ScopedCssBaseline>
      <InvertableThemeContext.Provider value={{ options }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </InvertableThemeContext.Provider>
    </ScopedCssBaseline>
  )
}

export default InvertableThemeProvider
