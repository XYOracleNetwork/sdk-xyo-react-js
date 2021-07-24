import { responsiveFontSizes, ScopedCssBaseline, ThemeOptions, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
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
    <InvertableThemeContext.Provider value={{ options }}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline />
        {children}
      </ThemeProvider>
    </InvertableThemeContext.Provider>
  )
}

export default InvertableThemeProvider
