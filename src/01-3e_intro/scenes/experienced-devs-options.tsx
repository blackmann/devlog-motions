import { Rect, Txt, makeScene2D } from '@motion-canvas/2d'
import {
  Direction,
  all,
  createRef,
  sequence,
  slideTransition,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'
import AppWindow from '../../components/app-window'
import Dock from '../../components/dock'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')

  yield* waitFor(2.2)

  const dock = createRef<Dock>()
  view.add(<Dock apps={6} position={[0, 600]} ref={dock} />)

  const codeWindow = createRef<AppWindow>()
  const browserWindow = createRef<AppWindow>()
  const blenderWindow = createRef<AppWindow>()
  view.add(<AppWindow title="vscode" ref={codeWindow} />)
  view.add(<AppWindow title="chrome" ref={browserWindow} />)
  view.add(<AppWindow title="blender" ref={blenderWindow} />)

  yield* codeWindow().minimize(0, 553, 0)
  yield* browserWindow().minimize(-124, 553, 0)
  yield* blenderWindow().minimize(255, 553, 0)

  yield* sequence(
    0.5,
    sequence(
      0.5,
      codeWindow().maximize(0, -180),
      dock().makeActive(2),
      codeWindow().makeInactive()
    ),
    sequence(
      0.5,
      browserWindow().maximize(-300, 160),
      dock().makeActive(1),
      browserWindow().makeInactive()
    ),
    sequence(0.5, blenderWindow().maximize(400, -100), dock().makeActive(4))
  )

  yield* waitFor(2)

  yield* waitUntil('expdevends')
})
