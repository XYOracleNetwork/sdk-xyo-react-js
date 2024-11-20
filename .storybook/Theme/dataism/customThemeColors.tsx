import type { PaletteColor, PaletteColorOptions } from '@mui/material'
import { darken, lighten } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    personas: {
      aegis: PaletteColor
      cass: PaletteColor
      echo: PaletteColor
      lux: PaletteColor
      myca: PaletteColor
      nova: PaletteColor
      rook: PaletteColor
      vex: PaletteColor
    }
  }

  interface PaletteOptions {
    personas?: {
      aegis?: PaletteColorOptions
      cass?: PaletteColorOptions
      echo?: PaletteColorOptions
      lux?: PaletteColorOptions
      myca?: PaletteColorOptions
      nova?: PaletteColorOptions
      rook?: PaletteColorOptions
      vex?: PaletteColorOptions
    }
  }
}

export const personaColorsLightMode = {
  nova: {
    main: '#F6BF28',
    dark: '#D09E16',
    light: lighten('#FADD8C', 0.4),
    contrastText: darken('#FADD8C', 0.8),
  },
  vex: {
    main: '#BFF07F',
    dark: '#8FCC3E',
    light: lighten('#BFF07F', 0.4),
    contrastText: darken('#BFF07F', 0.8),
  },
  rook: {
    main: '#B0AED5',
    dark: '#615dac',
    light: lighten('#B0AED5', 0.4),
    contrastText: darken('#B0AED5', 0.8),
  },
  lux: {
    main: '#FFDBF6',
    dark: '#FF5CD6',
    light: lighten('#FFDBF6', 0.4),
    contrastText: darken('#FFDBF6', 0.8),
  },
  aegis: {
    main: '#B3C9F9',
    dark: '#7AA1F5',
    light: lighten('#B3C9F9', 0.4),
    contrastText: darken('#B3C9F9', 0.8),
  },
  echo: {
    main: '#B0E4DA',
    dark: '#49C1A9',
    light: lighten('#B0E4DA', 0.4),
    contrastText: darken('#B0E4DA', 0.8),
  },
  myca: {
    main: '#BF936D',
    dark: '#AA774B',
    light: lighten('#BF936D', 0.4),
    contrastText: darken('#BF936D', 0.8),
  },
  cass: {
    main: '#b2cae4',
    dark: '#4078B5',
    light: lighten('#b2cae4', 0.4),
    contrastText: darken('#b2cae4', 0.8),
  },
}

export const personaColorsDarkMode = {
  nova: {
    main: '#FADD8C',
    contrastText: darken('#FADD8C', 0.9),
    light: lighten('#FADD8C', 0.4),
    dark: darken('#FADD8C', 0.5),
  },
  vex: {
    main: '#BFF07F',
    contrastText: darken('#BFF07F', 0.9),
    light: lighten('#BFF07F', 0.4),
    dark: darken('#BFF07F', 0.5),
  },
  rook: {
    main: '#8B88C2',
    contrastText: darken('#8B88C2', 0.9),
    light: lighten('#8B88C2', 0.4),
    dark: darken('#8B88C2', 0.5),
  },
  lux: {
    main: '#EB97D6',
    contrastText: darken('#EB97D6', 0.9),
    light: lighten('#EB97D6', 0.4),
    dark: darken('#EB97D6', 0.5),
  },
  aegis: {
    main: '#7aa1f5',
    contrastText: darken('#7aa1f5', 0.9),
    light: lighten('#7aa1f5', 0.4),
    dark: darken('#7aa1f5', 0.5),
  },
  echo: {
    main: '#B0E4DA',
    contrastText: darken('#B0E4DA', 0.9),
    light: lighten('#B0E4DA', 0.4),
    dark: darken('#B0E4DA', 0.5),
  },
  myca: {
    main: '#BF936D',
    contrastText: darken('#BF936D', 0.9),
    light: lighten('#BF936D', 0.4),
    dark: darken('#BF936D', 0.5),
  },
  cass: {
    main: '#b2cae4',
    contrastText: darken('#b2cae4', 0.9),
    light: lighten('#b2cae4', 0.4),
    dark: darken('#b2cae4', 0.5),
  },
}
