import { Img, Rect, Txt, Video, makeScene2D } from '@motion-canvas/2d'
import {
  Direction,
  all,
  createRef,
  sequence,
  slideTransition,
  useScene,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'
import AppWindow from '../../components/app-window'
import Dock from '../../components/dock'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')

  const foreground = useScene().variables.get('foreground', '#fefefe')

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

  yield* waitUntil('mention3e')

  yield* all(browserWindow().minimize(-124, 553, 0.3), dock().makeInactive(1))
  yield* all(blenderWindow().minimize(255, 553, 0.3), dock().makeInactive(4))

  yield* codeWindow().growWindow(800, 600)

  const app = createRef<Rect>()
  view.add(
    <Rect layout alignItems="center" opacity={0} position={[0, -200]} ref={app}>
      <Img src="/3e.png" marginRight={20} />
      <Txt fontSize={98} fill={foreground}>
        3e
      </Txt>
    </Rect>
  )

  yield* app().opacity(1, 0.5)

  yield* waitUntil('introends')

  const video = createRef<Video>()
  yield view.add(<Video src="/3e-appearance.mp4" ref={video} />)

  video().play()

  yield* waitUntil('appearanceends')

  video().pause()

  const animations = createRef<Video>()
  yield view.add(<Video src="/3e-animations.mp4" ref={animations} />)
  animations().play()

  yield* waitUntil('outlinerstarts')
  animations().pause()

  const outliner = createRef<Video>()
  yield view.add(<Video src="/3e-outliner.mp4" ref={outliner} />)

  outliner().play()

  yield* waitUntil('exportstarts')

  const exportVideo = createRef<Video>()
  yield view.add(<Video src="/3e-export.mp4" ref={exportVideo} />)

  exportVideo().play()

  yield* waitUntil('featuresend')
})
