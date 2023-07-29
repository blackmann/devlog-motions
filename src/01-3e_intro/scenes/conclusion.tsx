import { Txt, Video, makeScene2D } from "@motion-canvas/2d";
import { Direction, createRef, slideTransition, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {
  view.fill('#222')

  yield* slideTransition(Direction.Top)

  const video = createRef<Video>()
  yield view.add(<Video src="/3e-finale.mp4" ref={video} scale={0.8} />)

  video().play()

  yield* waitUntil('end')
})