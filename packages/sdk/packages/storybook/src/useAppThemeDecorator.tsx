import { Decorator } from '@storybook/react'
import { merge } from '@xylabs/lodash'
import { InvertibleThemeProvider } from '@xylabs/react-invertible-theme'
import { appThemeOptions, partialAppDarkThemeOptions, partialAppLightThemeOptions, themeOptions } from '@xyo-network/react-theme'
import { useDarkMode } from 'storybook-dark-mode'

const useAppThemeDecorator: Decorator = (Story, { args }) => {
  const darkMode = useDarkMode()
  const mergedThemeOptions = merge(themeOptions, appThemeOptions)
  return (
    <InvertibleThemeProvider
      dark={darkMode}
      options={mergedThemeOptions}
      lightOptions={partialAppLightThemeOptions}
      darkOptions={partialAppDarkThemeOptions}
    >
      <Story {...args} />
    </InvertibleThemeProvider>
  )
}

export { useAppThemeDecorator }
