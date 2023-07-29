import { Node, NodeProps, Rect, Txt, initial, signal } from '@motion-canvas/2d'
import { SimpleSignal, createRef, easeOutBack, linear, loop, sequence } from '@motion-canvas/core'

interface PromptProps extends NodeProps {
  label: string
}

class Prompt extends Node {
  blinkerRef = createRef<Txt>()
  commandRef = createRef<Txt>()
  rectRef = createRef<Rect>()

  @initial(2)
  @signal()
  public declare readonly waitTime: SimpleSignal<number, this>

  constructor({ label, ...props }: PromptProps) {
    super(props)
    this.add(
      <Rect layout direction="column" offsetX={-1}>
        <Txt fill="#dfbefb">{label}</Txt>
        <Rect layout>
          <Txt fill="#eee" offsetX={-1} ref={this.commandRef}></Txt>
          <Txt fill="#eee" ref={this.blinkerRef}>
            _
          </Txt>
        </Rect>
      </Rect>
    )
  }

  *blink(times = 3) {
    yield* loop(times, (i) =>
      sequence(
        0.2,
        this.blinkerRef().opacity(1, 0.2),
        this.blinkerRef().opacity(0, 0.2, easeOutBack)
      )
    )
    yield* this.blinkerRef().opacity(1, 0.1)
  }

  *hideBlinker() {
    yield* this.blinkerRef().opacity(0, 0.1)
  }

  *typeCommand(text: string, wpm = 80) {
    const perSecond = wpm / 60
    const time = text.length / 5 / perSecond
    yield* this.commandRef().text(text, time, linear)
  }
}

export default Prompt
