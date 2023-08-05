import '../global.css'

import { makeProject } from '@motion-canvas/core'
import viz from './scenes/viz?scene'

export default makeProject({
  scenes: [viz],
})
