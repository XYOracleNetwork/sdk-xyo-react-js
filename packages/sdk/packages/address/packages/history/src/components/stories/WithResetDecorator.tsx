import { Button } from '@mui/material'
import type { Decorator } from '@storybook/react'
import React from 'react'

import { useActiveBoundWitness } from '../../hooks/index.ts'

export const WithResetDecorator: Decorator = (Story, args) => {
  const {
    activeBoundWitness, setActiveBoundWitnessHash,
  } = useActiveBoundWitness()
  return (
    <>
      {activeBoundWitness
        ? (
            <Button variant="contained" onClick={() => setActiveBoundWitnessHash?.(undefined)}>
              Reset Active BW
            </Button>
          )
        : null}
      <Story {...args} />
    </>
  )
}
