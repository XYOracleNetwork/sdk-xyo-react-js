import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { AppBarsExample } from './AppBars.example.tsx'
import { ButtonsExample } from './Buttons.example.tsx'
import { PapersExample } from './Papers.example.tsx'
import { TextsExample } from './Texts.example.tsx'

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
