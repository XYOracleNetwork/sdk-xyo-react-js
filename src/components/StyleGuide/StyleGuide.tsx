import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/sdk-react'

import { Buttons } from './Buttons'
import { createTheme } from '@mui/material/styles'
import { themeOptions } from '../../theme'
import { ThemeProvider } from '@mui/styles'

export const StyleGuide: React.FC = () => {
  const theme = createTheme(themeOptions)
  console.log(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <FlexCol>
        <Typography variant="h5">XYO Network Style Guild</Typography>
        <Buttons />
      </FlexCol>
    </ThemeProvider>
  )
}
