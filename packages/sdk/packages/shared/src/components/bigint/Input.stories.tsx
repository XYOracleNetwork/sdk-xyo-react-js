import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { BigIntInput } from './Input.ts'

export default { title: 'Input/Bigint/Textfield', component: BigIntInput.TextField } as Meta<typeof BigIntInput.TextField>

const Template: StoryFn<typeof BigIntInput.TextField> = args => <BigIntInput.TextField {...args} />

const Default = Template.bind({})
Default.args = {}

export { Default }
