import { Grid, Line, Rect, makeScene2D } from '@motion-canvas/2d'
import Screen from '../../components/screen'
import { Vector2, chain, createRef, loop, waitFor } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.fill('#222')

  const screen = createRef<Screen>()
  view.add(<Screen dimension={new Vector2(12, 12)} pixelSize={40} ref={screen} />)

  const pixel = screen().plot(2, 0, '#999')
  screen().plot(-2, 2, '#999')

  yield* loop(6, () => chain(pixel().opacity(1, 0.5), pixel().opacity(0, 0.5)))
  yield* waitFor(3)
})
