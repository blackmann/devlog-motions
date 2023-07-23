import { Gradient, Node, NodeProps, Rect, Txt } from '@motion-canvas/2d'
import { createRef, easeInCubic } from '@motion-canvas/core'

class ProgressBar extends Node {
  contentRef = createRef<Txt>()

  constructor(props: NodeProps) {
    super(props)
    const gradient = new Gradient({
      fromX: -160,
      toX: 160,
      stops: [
        { offset: 0, color: 'orange' },
        { offset: 0.75, color: 'aqua' },
        { offset: 1, color: '#fefefe' },
      ],
    })

    this.add(<Txt offsetX={-1} fill={gradient} ref={this.contentRef}></Txt>)
  }

  *progress(time = 2) {
    yield* this.contentRef().text(
      ':::::::::::::::::::::::::::::::::::::::::',
      time,
      easeInCubic
    )
  }
}

export default ProgressBar
