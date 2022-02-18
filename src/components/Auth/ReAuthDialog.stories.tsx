import { Button } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, authServiceList, WrappedArgs } from '../../.storybook'
import { AuthActionTypes, useAuthState } from '../../contexts'
import { ReAuthDialog } from './ReAuthDialog'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
      },
    },
  },
  component: ReAuthDialog,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/ReAuthDialog',
} as ComponentMeta<typeof ReAuthDialog & WrappedArgs>

const Template: ComponentStory<typeof ReAuthDialog & WrappedArgs> = () => {
  const { dispatch } = useAuthState()

  return (
    <>
      <Button
        variant="contained"
        onClick={() => dispatch({ payload: { reAuthenticate: true }, type: AuthActionTypes.UpdateReAuthenticate })}
      >
        Trigger reAuthFlow
      </Button>
      <ReAuthDialog />
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
