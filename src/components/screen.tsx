import {
  Grid,
  Node,
  NodeProps,
  PossibleCanvasStyle,
  Rect,
} from '@motion-canvas/2d'
import {
  Color,
  Reference,
  Signal,
  SimpleSignal,
  Vector2,
  createRef,
  createSignal,
} from '@motion-canvas/core'

interface ScreenProps extends NodeProps {
  /** Number of pixels on x (horizontal) and y (vertical) axis */
  dimension: Vector2
  /** The origin will be set on the bottom-left pixel if undefined */
  originOffset?: Vector2

  pixelSize: number
}

class Screen extends Node {
  dimension: Vector2
  private containerRef = createRef<Rect>()
  pixelSize: SimpleSignal<number, void>

  constructor({ dimension, pixelSize, ...props }: ScreenProps) {
    super(props)
    this.dimension = dimension
    this.pixelSize = createSignal(pixelSize)

    this.add(
      <Rect ref={this.containerRef}>
        <Grid
          stroke="#666"
          width={() => this.pixelSize() * this.dimension.x}
          height={() => this.pixelSize() * this.dimension.y}
          spacing={this.pixelSize()}
        />
      </Rect>
    )
  }

  plot(x: number, y: number, fill: PossibleCanvasStyle): Reference<Rect> {
    const ref = createRef<Rect>()

    this.containerRef().add(
      <Rect
        fill={fill}
        ref={ref}
        width={this.pixelSize()}
        height={this.pixelSize()}
        position={[(x + 0.5) * this.pixelSize(), (-y + 0.5) * this.pixelSize()]}
      />
    )

    return ref
  }
}

export default Screen
