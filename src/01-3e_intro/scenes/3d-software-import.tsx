import { Img, Rect, Video, makeScene2D } from '@motion-canvas/2d'
import {
  Direction,
  all,
  createRef,
  sequence,
  slideTransition,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.fill('#222')

  yield* slideTransition(Direction.Right)

  const blender = createRef<Img>()
  const cinema4d = createRef<Img>()

  yield* waitUntil('mentionapps')

  view.add(
    <Rect layout>
      <Img src="/blender.png" height={200} ref={blender} opacity={0} />
      <Img src="/cinema4d.png" height={200} ref={cinema4d} opacity={0} />
    </Rect>
  )

  yield* sequence(
    0.8,
    blender().opacity(1, 0.5),
    cinema4d().opacity(1, 0.5)
  )

  yield* waitFor(1)

  const video = createRef<Video>()
  yield view.add(<Video src="/blender-glb-import.mp4" ref={video} />)
  video().play()

  yield* waitUntil('mentionnodes')
  yield* all(video().scale(2.5, 0.7), video().offset([0.51, -0.5], 0.7))

  yield* waitUntil("screencastends")
})
