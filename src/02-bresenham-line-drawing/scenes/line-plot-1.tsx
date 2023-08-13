import { makeScene2D } from '@motion-canvas/2d'
import { Vector2, all, createRef, waitFor, waitUntil } from '@motion-canvas/core'
import Screen from '../../components/screen'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')

  const screen = createRef<Screen>()
  view.add(
    <Screen
      dimension={new Vector2(12, 12)}
      labelSize={12}
      pixelSize={30}
      ref={screen}
    />
  )
  screen().originOffset(new Vector2(-3, 2))

  yield* screen().enter()

  yield* waitFor(0.5)

  const start = screen().plot(2, 3, '#999')

  yield* waitUntil('saysixseven')

  const end = screen().plot(6, 7, '#999')

  yield* waitUntil('startplotting')

  yield* all(end().opacity(0.3, 1), start().opacity(0.3, 1))

  yield* waitFor(1)

  const stops = [5.5, 7.5, 2, 2]

  yield* screen().line(
    new Vector2(2, 3),
    new Vector2(6, 7),
    '#999',
    (i) => stops[i] || stops[0]
  )

  yield* waitUntil('end')
})
