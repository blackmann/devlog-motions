import {
  Grid,
  Node,
  NodeProps,
  PossibleCanvasStyle,
  Rect,
  Txt,
} from '@motion-canvas/2d'
import {
  Reference,
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
  originOffset: SimpleSignal<Vector2, void>

  constructor({ dimension, originOffset, pixelSize, ...props }: ScreenProps) {
    super(props)
    this.dimension = dimension
    this.pixelSize = createSignal(pixelSize)
    this.originOffset = createSignal(originOffset || Vector2.zero)

    this.add(
      <Rect ref={this.containerRef}>
        <Grid
          stroke="#666"
          width={() => this.pixelSize() * this.dimension.x}
          height={() => this.pixelSize() * this.dimension.y}
          spacing={this.pixelSize()}
        />

        {this.getAxisMarks('x')}
        {this.getAxisMarks('y')}
      </Rect>
    )
  }

  plot(
    x: number,
    y: number,
    fill: PossibleCanvasStyle
  ): Reference<Rect> | undefined {
    const ref = createRef<Rect>()

    const plotx = () => (x + this.originOffset().x + 0.5) * this.pixelSize()
    const ploty = () => (-y + this.originOffset().y + 0.5) * this.pixelSize()

    this.containerRef().add(
      <Rect
        fill={fill}
        ref={ref}
        width={this.pixelSize()}
        height={this.pixelSize()}
        position={() => [plotx(), ploty()]}
      />
    )

    return ref
  }

  private getAxisMarks(axis: 'x' | 'y') {
    if (axis === 'x') {
      return (
        <Rect
          layout
          offsetX={-1}
          position={() => {
            const width = this.pixelSize() * this.dimension.x
            const yOffset = this.pixelSize() * (this.originOffset().y + 1)

            const p = [
              this.containerRef().left().x - width / 2,
              yOffset + this.pixelSize() / 2,
            ] as [number, number]

            return p
          }}
        >
          {Array.from({ length: this.dimension.x }).map((_, i) => (
            <Txt
              fill="#666"
              fontSize={20}
              width={this.pixelSize()}
              textAlign="center"
              text={() => `${i - this.dimension.x / 2 - this.originOffset().x}`}
            />
          ))}
        </Rect>
      )
    }

    return (
      <Rect
        layout
        direction="column"
        offsetY={-1}
        position={() => {
          const height = this.pixelSize() * this.dimension.y
          const xOffset = this.pixelSize() * (this.originOffset().x - 1)

          const p = [
            this.pixelSize() / 2 + xOffset,
            this.containerRef().top().y - height / 2 + this.pixelSize() * 1/4 ,
          ] as [number, number]

          return p
        }}
      >
        {Array.from({ length: this.dimension.y }).map((_, i) => (
          <Txt
            fill="#666"
            fontSize={20}
            width={this.pixelSize()}
            height={this.pixelSize()}
            textAlign={'center'}
            text={() => {
              const label = `${this.dimension.y / 2 - i + this.originOffset().y}`
              return label === '-1' ? '' : label
            }}
          />
        ))}
      </Rect>
    )
  }
}



export default Screen
