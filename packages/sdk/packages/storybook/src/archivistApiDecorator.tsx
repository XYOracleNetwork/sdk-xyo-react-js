import { DecoratorFn } from '@storybook/react'
import { ApiProvider } from '@xyo-network/react-api'

const archivistApiDecorator: DecoratorFn = (Story, { args }) => {
  return (
    <ApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <Story {...args} />
    </ApiProvider>
  )
}

export { archivistApiDecorator }
