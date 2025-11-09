export const colors = {
  // Brand colors from Hero component
  brand: {
    red: '#c41e3a',
    gray: '#2c3e50',
  },
  theme: {
    dark: {
      background: {
        primary: '#111827', // gray-900
        secondary: '#1f2937', // gray-800
        tertiary: '#374151', // gray-700
      },
      text: {
        primary: '#ffffff',
        secondary: '#9ca3af', // gray-400
        accent: '#c41e3a', // brand red
      },
      gradient: {
        primary: 'from-red-600 to-red-800',
        secondary: 'from-gray-700 to-gray-900',
        background: 'from-gray-900 via-gray-800 to-black',
      }
    },
    light: {
      background: {
        primary: '#ffffff',
        secondary: '#f3f4f6', // gray-100
        tertiary: '#e5e7eb', // gray-200
      },
      text: {
        primary: '#111827', // gray-900
        secondary: '#4b5563', // gray-600
        accent: '#c41e3a', // brand red
      },
      gradient: {
        primary: 'from-red-500 to-red-700',
        secondary: 'from-gray-200 to-gray-400',
        background: 'from-gray-50 via-white to-gray-100',
      }
    }
  }
};