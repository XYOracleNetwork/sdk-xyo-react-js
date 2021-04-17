import { createMuiTheme, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@material-ui/core'
import React, { useContext } from 'react'

interface InvertableTheme {
  options: ThemeOptions
}

interface InvertableThemeProviderProps {
  dark?: boolean
  invert?: boolean
  noResponsiveFonts?: boolean
  options?: ThemeOptions
}

export const InvertableThemeContext = React.createContext<InvertableTheme>({
  options: {},
})

function clone<T>(a: T): T {
  return JSON.parse(JSON.stringify(a))
}

const InvertableThemeProvider: React.FC<InvertableThemeProviderProps> = (props) => {
  const contextInvertableTheme = useContext(InvertableThemeContext)
  const { children, dark, invert = false, noResponsiveFonts } = props
  const { options = clone(contextInvertableTheme.options) } = props

  options.palette = options.palette ?? {}

  if (invert) {
    options.palette = options.palette ?? {}
    options.palette.mode = options.palette.mode === 'dark' ? 'light' : 'dark'
  }

  if (dark !== undefined) {
    options.palette = options.palette ?? {}
    options.palette.mode = dark ? 'dark' : 'light'
  }

  let theme = createMuiTheme(options)

  if (!noResponsiveFonts) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <InvertableThemeContext.Provider value={{ options }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </InvertableThemeContext.Provider>
  )
}

export default InvertableThemeProvider
