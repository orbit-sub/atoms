// ESLint flat config for the docs Next.js app.
// Provides a local config so ESLint does not walk up to the atoms
// library config (which enforces react-refresh rules not relevant here).
export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
]
