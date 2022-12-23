import { Button } from '@mui/material'
import { DecoratorFn } from '@storybook/react'

import { useActiveBoundWitness } from '../../hooks'

export const WithResetDecorator: DecoratorFn = (Story, args) => {
  const { activeBoundWitness, setActiveBoundWitnessHash } = useActiveBoundWitness()
  return (
    <>
      {activeBoundWitness ? (
        <Button variant="contained" onClick={() => setActiveBoundWitnessHash?.(undefined)}>
          Reset Active BW
        </Button>
      ) : null}
      <Story {...args} />
    </>
  )
}
