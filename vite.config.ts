import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/01-3e_intro/3e-intro.ts',
        './src/02-bresenham-line-drawing/bresenham.ts'
      ],
    }),
    ffmpeg(),
  ],
});
