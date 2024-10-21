const tintColorLight = '#FFAB40'; // Bright orange for light mode
const tintColorDark = '#FFC107';  // Bright yellow for dark mode

export const Colors = {
  light: {
    text: '#333333',            // Dark text for readability
    background: '#FFE5B4',      // Light peachy color, warm and playful
    tint: tintColorLight,       // Bright orange for highlights
    icon: '#FF7043',            // Contrasting coral for icons
    tabIconDefault: '#B0BEC5',  // Gray for default tab icons
    tabIconSelected: tintColorLight, 
  },
  dark: {
    text: '#FFFFFF',            // White text for readability
    background: '#1F1B24',      // Dark violet for a soft night-mode look
    tint: tintColorDark,        // Bright yellow for highlights
    icon: '#FFCC80',            // Light yellow for icons
    tabIconDefault: '#B0BEC5',  
    tabIconSelected: tintColorDark,
  },
};
