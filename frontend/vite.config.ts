import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as tailwindcss from 'tailwindcss'; // Import as namespace
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
});
