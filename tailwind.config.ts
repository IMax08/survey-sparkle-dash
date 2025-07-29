import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--primary-hover))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					hover: 'hsl(var(--card-hover))',
					foreground: 'hsl(var(--card-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				status: {
					success: 'hsl(var(--success))',
					warning: 'hsl(var(--warning))',
					danger: 'hsl(var(--danger))',
					info: 'hsl(var(--info))'
				},
				metric: {
					green: 'hsl(var(--metric-green))',
					orange: 'hsl(var(--metric-orange))',
					yellow: 'hsl(var(--metric-yellow))',
					red: 'hsl(var(--metric-red))'
				},
				sidebar: {
					bg: 'hsl(var(--sidebar-bg))',
					hover: 'hsl(var(--sidebar-hover))',
					text: 'hsl(var(--sidebar-text))',
					'text-hover': 'hsl(var(--sidebar-text-hover))',
					accent: 'hsl(var(--sidebar-accent))'
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glass': 'var(--gradient-glass)'
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'base': 'var(--shadow-base)',
				'lg': 'var(--shadow-lg)',
				'premium': 'var(--shadow-premium)'
			},
			spacing: {
				'sidebar': 'var(--space-sidebar)',
				'navbar': 'var(--space-navbar)',
				'card': 'var(--space-card)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'heartbeat': {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.05)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(1)' }
				},
				'bounce-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.3)' 
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)' 
					},
					'70%': { transform: 'scale(0.9)' },
					'100%': { 
						opacity: '1',
						transform: 'scale(1)' 
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)' 
					}
				},
				'slide-in-left': {
					'0%': { 
						opacity: '0',
						transform: 'translateX(-100%)' 
					},
					'100%': { 
						opacity: '1',
						transform: 'translateX(0)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
				'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
