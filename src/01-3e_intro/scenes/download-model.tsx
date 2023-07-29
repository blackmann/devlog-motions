import { Txt, Video, makeScene2D } from '@motion-canvas/2d'
import { createRef, waitFor } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  const videoRef = createRef<Video>()
  view.add(
    <Video
      play
      ref={videoRef}
      src="/sketchfab-model-download.mp4"
    />
  )

  yield* waitFor(7)
})
