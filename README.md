# Tailwind CSS prefers color scheme

This plugin for [Tailwind CSS](https://tailwindcss.com) adds variants for dark and light modes using the [`prefers-color-scheme` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

## Installation

    npm install tailwindcss-prefers-color-scheme

## Usage

```js
// in tailwind.config.js
{
  variants: [
    backgroundColor: ['responsive', 'light-mode', 'dark-mode']
  ],
  plugins: [
    require('tailwindcss-prefers-color-scheme')()
  ]
}
```

This would generate classes like the following:

```css
.bg-red-100 {
  background-color: red;
}

@media (prefers-color-scheme: light) {
  .light-mode\:bg-red-100 {
    background-color: red;
  }
}

@media (prefers-color-scheme: dark) {
  .dark-mode\:bg-red-100 {
    background-color: red;
  }
}
```
