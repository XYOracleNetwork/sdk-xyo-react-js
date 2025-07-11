import { Button } from '@mui/material'
import type { Decorator } from '@storybook/react-vite'
import React, { useRef } from 'react'

export const WithRefDecorator: Decorator = (Story, args) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const onClick = () => {
    if (ref.current) {
      ref.current.style.color = 'green'
    }
  }

  args.args.ref = ref
  return (
    <>
      <Button onClick={onClick} variant="contained">
        Change to green
      </Button>
      <Story {...args} />
    </>
  )
}
