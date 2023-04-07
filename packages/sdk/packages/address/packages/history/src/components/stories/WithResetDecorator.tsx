import { Button } from '@mui/material'
import { Decorator } from '@storybook/react'

import { useActiveBoundWitness } from '../../hooks'

export const WithResetDecorator: Decorator = (Story, args) => {
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
