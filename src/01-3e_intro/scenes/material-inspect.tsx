import { Rect, Txt, Video, makeScene2D } from '@motion-canvas/2d'
import {
  createRef,
  fadeTransition,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.fill('#222')

  yield* fadeTransition()

  view.add(<Txt fontSize={100}>🤔</Txt>)

  yield* waitFor(5)

  const video = createRef<Video>()
  yield view.add(<Video src="/materials-render.mp4" ref={video} scale={0.8} />)

  video().play()

  yield* waitUntil('renderstep')

  view.add(
    <Rect
      width="100%"
      height="100%"
      fill="#222"
      alignItems="center"
      justifyContent="center"
      layout
    >
      <Txt fontSize={100}>😪😮‍💨</Txt>
    </Rect>
  )

  yield* waitUntil('extratalk')
})
