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
  all,
  createRef,
  createSignal,
  waitFor,
} from '@motion-canvas/core'

interface ScreenProps extends NodeProps {
  /** Number of pixels on x (horizontal) and y (vertical) axis */
  dimension: Vector2
  /** The origin will be set on the bottom-left pixel if undefined */
  originOffset?: Vector2

  pixelSize: number

  labelSize?: number
}

class Screen extends Node {
  dimension: Vector2
  private containerRef = createRef<Rect>()
  private grid = createRef<Grid>()
  private axes = createRef<Node>()
  labelSize: number
  pixelSize: SimpleSignal<number, void>
  originOffset: SimpleSignal<Vector2, void>

  constructor({
    dimension,
    labelSize = 20,
    originOffset,
    pixelSize,
    ...props
  }: ScreenProps) {
    super(props)
    this.dimension = dimension
    this.pixelSize = createSignal(pixelSize)
    this.labelSize = labelSize
    this.originOffset = createSignal(originOffset || Vector2.zero)

    this.add(
      <Rect ref={this.containerRef}>
        <Grid
          stroke="#666"
          width={() => this.pixelSize() * this.dimension.x}
          height={() => this.pixelSize() * this.dimension.y}
          spacing={this.pixelSize()}
          start={0}
          end={0}
          ref={this.grid}
        />

        <Node ref={this.axes} opacity={0}>
          {this.getAxisMarks('x')}
          {this.getAxisMarks('y')}
        </Node>
      </Rect>
    )
  }

  *enter() {
    yield* all(
      this.grid().end(0.5, 1).to(1, 1),
      this.grid().start(0.5, 1).to(0, 1)
    )

    yield* this.axes().opacity(1, 0.5)
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

  *line(
    start: Vector2,
    end: Vector2,
    fill: PossibleCanvasStyle,
    wait: (i: number) => number
  ) {
    const dy = end.y - start.y
    const dx = end.x - start.x
    const m = dy / dx
    let e = m - 1

    let x = start.x
    let y = start.y

    let i = 0

    while (x <= end.x) {
      this.plot(x, y, fill)

      yield* waitFor(wait(i++))

      x++
      if (e >= 0) {
        y++
        e -= 1
      }

      e += m
    }
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
              fontSize={this.labelSize}
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
            this.containerRef().top().y -
              height / 2 +
              (this.pixelSize() * 1) / 4,
          ] as [number, number]

          return p
        }}
      >
        {Array.from({ length: this.dimension.y }).map((_, i) => (
          <Txt
            fill="#666"
            fontSize={this.labelSize}
            width={this.pixelSize()}
            height={this.pixelSize()}
            textAlign={'center'}
            text={() => {
              const label = `${
                this.dimension.y / 2 - i + this.originOffset().y
              }`
              return label === '-1' ? '' : label
            }}
          />
        ))}
      </Rect>
    )
  }
}

export default Screen
