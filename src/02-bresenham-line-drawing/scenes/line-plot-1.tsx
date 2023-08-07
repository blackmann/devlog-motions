import { makeScene2D } from '@motion-canvas/2d'
import { Vector2, createRef } from '@motion-canvas/core'
import Screen from '../../components/screen'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')

  const screen = createRef<Screen>()
  view.add(
    <Screen
      dimension={new Vector2(20, 16)}
      labelSize={12}
      pixelSize={20}
      ref={screen}
    />
  )
  screen().originOffset(new Vector2(-5, 3))
  screen().line(new Vector2(0, 0), new Vector2(7, 7), '#999')
})
