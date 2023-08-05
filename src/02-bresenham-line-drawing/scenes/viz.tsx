import { makeScene2D } from '@motion-canvas/2d'
import Screen from '../../components/screen'
import { Vector2, chain, createRef, loop, waitFor } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')

  const screen = createRef<Screen>()
  view.add(<Screen dimension={new Vector2(12, 12)} pixelSize={40} ref={screen} />)
  screen().originOffset(new Vector2(-3, 0))

  screen().plot(0,0, '#fff')
  const pixel = screen().plot(2, 0, '#999')
  screen().plot(-2, 2, '#999')

  yield* loop(2, () => chain(pixel().opacity(1, 0.5), pixel().opacity(0, 0.5)))
  yield* waitFor(1)

  screen().originOffset(new Vector2(0, 2))

  yield* waitFor(3)
})
