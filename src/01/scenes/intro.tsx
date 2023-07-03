import { Rect, Txt, makeScene2D } from '@motion-canvas/2d'
import { waitFor } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.add(<Rect width="100%" height="100%" fill="#222" />)
  view.add(
    <Txt fontFamily="Zed Mono" fill="#f3f3f3">
      Hello world!
    </Txt>
  )

  yield* waitFor(5)
})
