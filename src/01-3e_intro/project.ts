import '../global.css'
import { makeProject } from '@motion-canvas/core'

import intro from './scenes/intro?scene'
import downloadModel from './scenes/download-model?scene'
import postDownload from './scenes/post-download?scene'

import audio from './3e.mp3'

export default makeProject({
  scenes: [
    intro,
    downloadModel,
    postDownload,
    //
  ],
  audio,
  variables: {
    foreground: '#fefefe',
    secondary: '#999'
  },
})
