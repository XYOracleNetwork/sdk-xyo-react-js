import { DecoratorFn } from '@storybook/react'
import { InvertableThemeProvider } from '@xylabs/sdk-react'
import merge from 'lodash/merge'
import { useDarkMode } from 'storybook-dark-mode'
import { appThemeOptions, partialDarkThemeOptions, themeOptions } from '../theme'

const appThemeDecorator: DecoratorFn = (Story, { args }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const darkMode = useDarkMode()
  const mergedThemeOptions = merge(themeOptions, appThemeOptions)
  return (
    <InvertableThemeProvider dark={darkMode} options={mergedThemeOptions} darkOptions={partialDarkThemeOptions}>
      <Story {...args} />
    </InvertableThemeProvider>
  )
}

export { appThemeDecorator }
