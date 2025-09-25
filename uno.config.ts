import type { Preset } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { themeConfig } from './src/config.ts'

const { light, dark } = themeConfig.color

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTheme({
      theme: {
        dark: {
          colors: {
            ...dark,
            note: 'oklch(70.7% 0.165 254.624 / 0.8)', // blue-400
            tip: 'oklch(76.5% 0.177 163.223 / 0.8)', // emerald-400
            important: 'oklch(71.4% 0.203 305.504 / 0.8)', // purple-400
            warning: 'oklch(82.8% 0.189 84.429 / 0.8)', // amber-400
            caution: 'oklch(70.4% 0.191 22.216 / 0.8)', // red-400
          },
        },
      },
    }) as Preset<object>,
  ],
  theme: {
    colors: {
      ...light,
      note: 'oklch(48.8% 0.243 264.376 / 0.8)', // blue-700
      tip: 'oklch(50.8% 0.118 165.612 / 0.8)', // emerald-700
      important: 'oklch(49.6% 0.265 301.924 / 0.8)', // purple-700
      warning: 'oklch(55.5% 0.163 48.998 / 0.8)', // amber-700
      caution: 'oklch(50.5% 0.213 27.518 / 0.8)', // red-700
    },
    fontFamily: {
      title: ['Snell-Black', 'EarlySummer-Subset', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      navbar: ['STIX-Italic', 'EarlySummer-Subset', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      time: ['Snell-Bold', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      serif: ['STIX', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },
  rules: [
    ['scrollbar-hidden', {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
    }],
  ],
  shortcuts: {
    // =============================================================================
    // EXISTING SHORTCUTS (Keep these)
    // =============================================================================
    'uno-desktop-column': 'fixed right-[max(5rem,calc(50vw-35rem))] w-14rem',
    'uno-decorative-line': 'mb-4.5 h-0.25 w-10 bg-secondary/25 lg:(mb-6 w-11)',
    'uno-round-border': 'border border-secondary/5 rounded border-solid',

    // =============================================================================
    // NEW COMPONENT SHORTCUTS - Design System
    // =============================================================================
    
    // Color System
    'primary-text': 'c-primary',
    'secondary-text': 'c-secondary', 
    'secondary-text-faded': 'c-secondary/80',
    'secondary-text-subtle': 'c-secondary/25',
    'primary-border': 'border-primary/25',
    'secondary-border': 'border-secondary/25',
    'subtle-border': 'border-secondary/15',
    'highlight-bg': 'bg-highlight',
    'background-subtle': 'bg-secondary/5',
    'surface-elevated': 'bg-background subtle-border uno-round-border',

    // Interactive States
    'hover-primary': 'hover:(c-primary border-primary/25)',
    'hover-highlight': 'hover:(bg-secondary/5 c-primary)',
    'focus-ring': 'focus:(border-primary/50 outline-none ring-2 ring-primary/20)',

    // =============================================================================
    // BUTTON SYSTEM
    // =============================================================================
    'btn-base': 'cursor-pointer uno-round-border transition-colors ease-out inline-flex items-center justify-center font-medium focus-ring active:scale-98',
    'btn-ghost': 'btn-base bg-transparent secondary-border secondary-text hover-primary',
    'btn-primary': 'btn-base bg-primary c-background border-primary hover:bg-primary/90 focus:bg-primary/90',
    'btn-icon': 'btn-base aspect-square p-2',
    'btn-icon-sm': 'btn-icon w-8 h-8',
    'btn-icon-md': 'btn-icon w-10 h-10',

    // Specialized Buttons
    'code-copy-btn': 'btn-icon-sm absolute right-2.2 top-2.2 z-99 bg-background secondary-text-faded op-0 hover-primary',
    'mobile-btn': 'btn-icon-md secondary-text hover-primary',

    // =============================================================================
    // NAVIGATION SYSTEM
    // =============================================================================
    'nav-link': 'relative inline-block py-0.8 transition-colors ease-out hover:c-primary after:bottom-0.35em',
    'nav-active': 'nav-link c-primary font-bold',
    'nav-inactive': 'nav-link secondary-text hover:c-primary',
    'mobile-nav-item': 'block w-full px-4 py-3 text-left font-semibold secondary-text transition-colors ease-out hover-highlight',
    'mobile-nav-active': 'mobile-nav-item primary-text bg-secondary/10',

    // =============================================================================
    // CONTENT SYSTEM  
    // =============================================================================
    'content-heading': 'scroll-mt-20 font-semibold mb-4 mt-1.5em',
    'content-heading-primary': 'content-heading text-7 primary-text',
    'content-heading-secondary': 'content-heading text-6 primary-text', 
    'content-heading-tertiary': 'content-heading text-5',
    'content-link': 'font-semibold tracking-0 underline underline-0.075em decoration-secondary/80 underline-offset-0.1em cjk:break-all transition-colors ease-out hover:(c-primary decoration-primary/80) lg:underline-0.1em',
    'content-image': 'mx-auto cursor-zoom-in',
    'content-image-spacing': 'my-6',
    'content-figure': 'content-image-spacing w-full',
    'content-caption': 'mt-2.5 text-center text-sm secondary-text-faded',

    // =============================================================================
    // FORM SYSTEM
    // =============================================================================
    'input-base': 'secondary-border uno-round-border bg-transparent px-3 py-2 transition-colors ease-out focus-ring',
    'input-text': 'input-base w-full',
    'input-textarea': 'input-base w-full min-h-20 resize-vertical',
    'form-group': 'mb-4',
    'form-label': 'block mb-2 text-sm font-medium secondary-text',

    // =============================================================================
    // CODE SYSTEM
    // =============================================================================
    'code-block': 'overflow-auto uno-round-border px-4 py-3 background-subtle',
    'code-block-wrapper': 'relative',
    'code-inline': 'px-1.5 py-0.5 uno-round-border bg-secondary/10 text-sm font-mono',

    // =============================================================================
    // LAYOUT SYSTEM
    // =============================================================================
    
    // Spacing System
    'spacing-xs': 'mb-1 mt-0.5',
    'spacing-sm': 'mb-2 mt-1', 
    'spacing-md': 'mb-4 mt-2',
    'spacing-lg': 'mb-6 mt-4',
    'spacing-xl': 'mb-8 mt-6',

    // Container System
    'container-center': 'mx-auto max-w-prose',
    'container-full': 'w-full mx-auto',

    // Flexbox System
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-start': 'flex items-center justify-start', 
    'flex-end': 'flex items-center justify-end',

    // Grid System
    'grid-auto': 'grid grid-cols-auto gap-4',
    'grid-responsive': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',

    // =============================================================================
    // RESPONSIVE SYSTEM
    // =============================================================================
    'mobile-only': 'lg:hidden',
    'desktop-only': 'hidden lg:block', 
    'tablet-up': 'hidden md:block',
    'mobile-nav-container': 'lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm secondary-border border-b',
    'mobile-nav-content': 'flex items-center h-14 px-4 gap-3',
    'mobile-menu': 'absolute top-full left-0 right-0 bg-background subtle-border border-t shadow-lg',
    'desktop-sidebar': 'desktop-only uno-desktop-column',

    // =============================================================================
    // ANIMATION SYSTEM
    // =============================================================================
    'transition-base': 'transition-all duration-150 ease-out',
    'transition-colors': 'transition-colors duration-150 ease-out', 
    'transition-transform': 'transition-transform duration-200 ease-out',
    'transition-opacity': 'transition-opacity duration-300 ease-out',
    'hover-lift': 'transition-transform hover:-translate-y-1',
    'hover-scale': 'transition-transform hover:scale-105',
    'active-scale': 'active:scale-95',
    'loading-pulse': 'animate-pulse',
    'loading-spin': 'animate-spin',

    // =============================================================================
    // ADMONITION SYSTEM
    // =============================================================================
    'admonition': 'uno-round-border p-4 mb-4',
    'admonition-title': 'font-semibold mb-2 flex items-center',
    'admonition-note': 'admonition border-note',
    'admonition-tip': 'admonition border-tip',
    'admonition-warning': 'admonition border-warning',
    'admonition-important': 'admonition border-important',
    'admonition-caution': 'admonition border-caution',

    // =============================================================================
    // ICON SYSTEM
    // =============================================================================
    'icon': 'inline-block flex-shrink-0',
    'icon-xs': 'icon w-3 h-3',
    'icon-sm': 'icon w-4 h-4', 
    'icon-md': 'icon w-5 h-5',
    'icon-lg': 'icon w-6 h-6',
    'icon-interactive': 'icon cursor-pointer transition-colors ease-out secondary-text-faded hover:secondary-text',
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('cjk:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(4),
        selector: s => `${s}:is(:lang(zh), :lang(ja), :lang(ko))`,
      }
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
