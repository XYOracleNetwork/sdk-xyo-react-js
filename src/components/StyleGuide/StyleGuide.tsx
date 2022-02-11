import { Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles'
import { FlexCol } from '@xylabs/sdk-react'

import { themeOptions } from '../../theme'
import { Buttons } from './Buttons'
import { Papers } from './Papers'

export const StyleGuide: React.FC = () => {
  const theme = createTheme(themeOptions)
  console.log(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <FlexCol alignItems="stretch">
        <Typography variant="h5">XYO Network Style Guild</Typography>
        <Buttons />
        <Papers />
      </FlexCol>
    </ThemeProvider>
  )
}
