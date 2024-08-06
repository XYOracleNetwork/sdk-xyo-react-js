import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { AppBarsExample } from './AppBars.example.js'
import { ButtonsExample } from './Buttons.example.js'
import { PapersExample } from './Papers.example.js'
import { TextsExample } from './Texts.example.js'

export const StyleGuideExample: React.FC = () => {
  return (
    <FlexCol alignItems="stretch">
      <Typography variant="h5">XYO Network Style Guide</Typography>
      <AppBarsExample />
      <ButtonsExample />
      <PapersExample />
      <TextsExample />
    </FlexCol>
  )
}
