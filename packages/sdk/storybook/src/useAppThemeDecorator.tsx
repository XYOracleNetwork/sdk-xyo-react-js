import { DecoratorFn } from '@storybook/react'
import { InvertableThemeProvider } from '@xylabs/react-invertable-theme'
import { appThemeOptions, partialAppDarkThemeOptions, partialAppLightThemeOptions, themeOptions } from '@xyo-network/react-theme'
import merge from 'lodash/merge'
import { useDarkMode } from 'storybook-dark-mode'

const useAppThemeDecorator: DecoratorFn = (Story, { args }) => {
  const darkMode = useDarkMode()
  const mergedThemeOptions = merge(themeOptions, appThemeOptions)
  return (
    <InvertableThemeProvider dark={darkMode} options={mergedThemeOptions} lightOptions={partialAppLightThemeOptions} darkOptions={partialAppDarkThemeOptions}>
      <Story {...args} />
    </InvertableThemeProvider>
  )
}

export { useAppThemeDecorator }
