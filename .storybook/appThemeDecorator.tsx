import { DecoratorFn } from '@storybook/react'
import { InvertableThemeProvider } from '@xylabs/react-invertable-theme'
import { appThemeOptions, partialDarkThemeOptions, themeOptions } from '@xyo-network/react-theme'
import merge from 'lodash/merge'
import { useDarkMode } from 'storybook-dark-mode'

const appThemeDecorator: DecoratorFn = (Story, { args }) => {
  const darkMode = useDarkMode()
  const mergedThemeOptions = merge(themeOptions, appThemeOptions)
  return (
    <InvertableThemeProvider dark={darkMode} options={mergedThemeOptions} darkOptions={partialDarkThemeOptions}>
      <Story {...args} />
    </InvertableThemeProvider>
  )
}

export { appThemeDecorator }
