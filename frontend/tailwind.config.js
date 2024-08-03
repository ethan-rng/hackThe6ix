const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['poppins', 'sans-serif'],
      },
      colors: {
        primary: "#272A46",
        secondary: "#EAD2FF",
        tertiary: "#FFFFFF",
        highlight: "#7472FF",
        
      },
      fontSize: {
        xxxs: ['0.5rem', '0.5rem'],
        xxs: ['0.625rem', '0.75rem'] 
      },
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '1000': '1000ms',
      },
      screens: {
        'landscape': { 'raw': '(orientation: landscape)'},
        xs: "385px", // Smallest smartphones
        sm: "640px", // Small screens, like smartphones
        md: "768px", // Medium screens, like tablets
        lg: "1024px", // Large screens, like laptops
        xl: "1280px", // Extra large screens, like desktops
        "2xl": "1536px", // Extra extra large screens
      },
    },

    animation: {
      slideup: "slideup 1s ease-in-out",
      slidedown: "slidedown 1s ease-in-out",
      slideleft: "slideleft 1s ease-in-out",
      slideright: "slideright 1s ease-in-out",
      wave: "wave 1.2s linear infinite",
      slowfade: "slowfade 2.2s ease-in-out",
      bounce: "bounce 1s infinite",
      grow: "grow 1s ease-in forwards",
      fadeInUp: 'fadeInUp 1s ease-out forwards',
      fadeInOut: "fadeInOut 2s linear infinite",
      minimize: 'minimizeEffect 0.5s ease-in-out forwards',
      maximize: 'maximizeEffect 0.5s ease-in-out forwards',
    },

    keyframes: {
      slideup: {
        from: { opacity: "0", transform: "translateY(25%)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slidedown: {
        from: { opacity: "0", transform: "translateY(-25%)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideleft: {
        from: { opacity: "0", transform: "translateX(-20px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      slideright: {
        from: { opacity: "0", transform: "translateX(20px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      slowfade: {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)', // Optional if you want to include it here
        },
        '50%': {
          transform: 'translateY(0)',
          'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)', // Optional if you want to include it here
        },
      },
      grow: {
        from: { transform: "scale(0.6)" },
        to: { transform: "scale(1)" },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInOut: {
        '0%': { opacity: '1' },
        '50%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      minimizeEffect: {
        '0%': {
          transform: 'translateY(0) scale(1)',
          opacity: '1',
        },
        '100%': {
          transform: 'translateY(100px) scale(0.5)',
          opacity: '0',
        },
      },
      maximizeEffect: {
        '0%': {
          transform: 'translateY(100px) scale(0.5)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateY(0) scale(1)',
          opacity: '1',
        },
      },
    },
    plugins: [],
  },
};



export default config;
