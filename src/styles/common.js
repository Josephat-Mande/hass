export const commonStyles = {
  headingPrimary: (isDarkMode) => 
    `text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
  
  headingSecondary: (isDarkMode) => 
    `text-2xl md:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
  
  paragraph: (isDarkMode) => 
    `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`,
  
  card: (isDarkMode) => 
    `rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`,
  
  button: {
    primary: 'bg-gradient-to-r from-red-600 to-red-800 text-white',
    secondary: (isDarkMode) => 
      `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`,
  },
  
  link: (isDarkMode) => 
    `transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`,
  
  backgroundGradient: (isDarkMode) =>
    isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
      : 'bg-gradient-to-br from-gray-100 via-white to-gray-200',

  input: (isDarkMode) =>
    `rounded-lg px-4 py-2 w-full ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    }`,

  badge: (isDarkMode) =>
    `inline-flex items-center px-3 py-1 rounded-full text-sm ${
      isDarkMode
        ? 'bg-gray-700 text-gray-200'
        : 'bg-gray-200 text-gray-700'
    }`
};