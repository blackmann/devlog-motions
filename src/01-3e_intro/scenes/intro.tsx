import { Rect, Txt, makeScene2D } from '@motion-canvas/2d'
import { all, createRef, createSignal, easeInCubic, waitFor } from '@motion-canvas/core'
import Prompt from '../../components/prompt'
import ProgressBar from '../../components/progress-bar'

export default makeScene2D(function* (view) {
  view.fontFamily('Zed Mono')
  view.fill('#222')
  view.justifyContent('start')
  view.fontSize(30)

  const cdPrompt = createRef<Prompt>()
  view.add(<Prompt label="~" ref={cdPrompt} position={[-700, -400]} />)

  yield* cdPrompt().blink(3)
  yield* cdPrompt().typeCommand('cd Documents/devlogs', 105)
  yield* cdPrompt().blink(2)

  yield* cdPrompt().hideBlinker()

  cdPrompt().waitTime(7, 0.1)

  const startPrompt = createRef<Prompt>()
  view.add(
    <Prompt
      label="~/Documents/devlogs"
      ref={startPrompt}
      position={[-700, -280]}
    />
  )

  yield* startPrompt().blink()
  yield* startPrompt().typeCommand('start ./ep1')
  yield* startPrompt().hideBlinker()

  yield* waitFor(1)

  const progressBar = createRef<ProgressBar>()
  const progress = createSignal(0)
  const progressText = createRef<Txt>()
  view.add(
    <Txt
        fill="#fefefe"
        ref={progressText}
        offsetX={-1}
        text={() => `${Math.trunc(progress())}%`}
        position={[-700, -180]}
      />
  )
  view.add(<ProgressBar ref={progressBar} position={[-700, -150]} />)

  yield* all(progressBar().progress(), progress(100, 2, easeInCubic))

  yield* waitFor(1)
})
