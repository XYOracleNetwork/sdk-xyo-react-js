import { DecoratorFn } from '@storybook/react'
import { ArchivistApiProvider } from '../archivist-api'

const archivistApiDecorator: DecoratorFn = (Story, { args }) => {
  return (
    <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
      <Story {...args} />
    </ArchivistApiProvider>
  )
}

export { archivistApiDecorator }
