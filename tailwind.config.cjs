/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Nunito',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			normal: 400,
  			medium: 500,
  			semibold: 600,
  			bold: 700,
  			extrabold: 800,
  			black: 900,
  			extrablack: 1000
  		},
  		colors: {
  			'purple-10': '#D9D7F0',
  			'purple-20': '#A19BD9',
  			'purple-50': '#7950E5',
  			'purple-80': '#563B9A',
  			'purple-100': '#1A1A2E',
  			black: '#10101C',
  			'yellow-50': '#FECD19',
  			'orange-50': '#FFA43D',
  			'orange-80': '#BF7B2E',
  			'green-50': '#97E851',
  			'green-80': '#6CB928',
  			'turquoise-50': '#3AE8BD',
  			'turquoise-80': '#1F9C7D',
  			'blue-50': '#00A2FE',
  			'red-50': '#E94560',
  			'red-logo': '#CC302E',
  			'geoguessr-green': '#97E851',
  			'geoguessr-dark-green': '#6CB928',
  			'geoguessr-blue': '#00A2FE',
  			'geoguessr-dark-blue': '#0367b4',
  			'geoguessr-red': '#E94560',
  			'geoguessr-dark-red': '#cd4c4c',
  			'geoguessr-yellow': '#FECD19',
  			'geoguessr-dark-yellow': '#BF7B2E',
  			'geoguessr-purple': '#7950E5',
  			'geoguessr-dark-purple': '#563B9A',
  			'geoguessr-grey': '#e7e7e7',
  			'geoguessr-dark-grey': '#d5d5d5',
  			'geoguessr-black': '#10101C',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			xl: '1rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
