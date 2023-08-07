import '../global.css'

import { makeProject } from '@motion-canvas/core'
import intro from './scenes/intro?scene'
import linePlot1 from './scenes/line-plot-1?scene'

import audio from './line-drawing.devlog.mp3'

export default makeProject({
  scenes: [intro, linePlot1],
  audio,
  variables: {
    foreground: '#fefefe',
    secondary: '#999',
    tertiary: '#444',
    red: '#DB5D3A',
    green: '#59AF82'
  },
})
