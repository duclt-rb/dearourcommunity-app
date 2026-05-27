import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f5eeff',
      100: '#ede0ff',
      200: '#dbc1ff',
      300: '#c499ff',
      400: '#a96eff',
      500: '#8f50e2',
      600: '#7a46c7',
      700: '#6b3fb8',
      800: '#55309a',
      900: '#3d2170',
      950: '#2a1554',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f9f9f9',
          100: '#f5f5f5',
          200: '#efefef',
          300: '#d9d9d9',
          400: '#d2d2d2',
          500: '#b0b0b0',
          600: '#8a8a8a',
          700: '#6b6b6b',
          800: '#4a4a4a',
          900: '#1c1c1c',
          950: '#0a0a0a',
        },
      },
    },
  },
});

export default CustomPreset;
