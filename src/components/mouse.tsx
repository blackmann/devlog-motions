import { Node, NodeProps, Rect } from '@motion-canvas/2d'
import { easeInCubic } from '@motion-canvas/core'

class Mouse extends Node {
  constructor(props: NodeProps) {
    super(props)

    this.add(<Rect fill="#ffffffaa" width={40} height={40} radius={20} />)
  }

  *enter() {
    yield* this.opacity(1, 0.3, easeInCubic)
  }

  *leave() {
    yield* this.opacity(0, 0.8, easeInCubic)
  }

  *press() {
    yield* this.scale(0.8, 0.3, easeInCubic)
  }

  *release() {
    yield* this.scale(1, 0.3, easeInCubic)
  }
}

export default Mouse
