import { Txt, makeScene2D } from '@motion-canvas/2d'
import { createRef, waitFor } from '@motion-canvas/core'
import Prompt from '../../templates/prompt'
import ProgressBar from '../../templates/progress-bar'

export default makeScene2D(function* (view) {
  view.fontFamily('Zed Mono')
  view.fill('#222')
  view.justifyContent('start')

  const cdPrompt = createRef<Prompt>()
  view.add(<Prompt label="~" ref={cdPrompt} position={[-700, -400]} />)

  yield* cdPrompt().blink(3)
  yield* cdPrompt().typeCommand('cd Documents/devlogs', 105)
  yield* cdPrompt().blink(2)

  yield* cdPrompt().hideBlinker()

  const startPrompt = createRef<Prompt>()
  view.add(
    <Prompt
      label="~/Documents/devlogs"
      ref={startPrompt}
      position={[-700, -200]}
    />
  )

  yield* startPrompt().blink()
  yield* startPrompt().typeCommand('start ./ep1')
  yield* startPrompt().hideBlinker()

  yield* waitFor(1)

  const progressBar = createRef<ProgressBar>()
  view.add(<ProgressBar ref={progressBar} position={[-700, -50]} />)

  yield* progressBar().progress()

  yield* waitFor(1)
})
