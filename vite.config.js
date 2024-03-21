import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@scssVariables': '/src/styles/_variables.scss',
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
  define: {
    'import.meta.env.REACT_APP_API_URL': JSON.stringify(
      process.env.REACT_APP_API_URL
    ),
    'import.meta.env.REACT_APP_IMAGES_URL': JSON.stringify(
      process.env.REACT_APP_IMAGES_URL
    ),
    'import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY': JSON.stringify(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    ),
  },
});
