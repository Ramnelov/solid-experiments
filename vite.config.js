import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    hmr: true,
    watch: {
      usePolling: true,
      //interval: 100,
    },
  },
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {},
    global: {},
  },
});
