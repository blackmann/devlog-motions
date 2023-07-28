import { Circle, Node, NodeProps, Rect, Txt } from '@motion-canvas/2d'
import {
  DEFAULT,
  all,
  createRef,
  useLogger,
  useScene,
} from '@motion-canvas/core'

interface Props extends NodeProps {
  title: string
}

const WINDOW_CONTROL_DIAMETER = 20

class AppWindow extends Node {
  windowControls = createRef<Rect>()
  windowShell = createRef<Rect>()

  constructor({ title, children, ...props }: Props) {
    super(props)
    const secondary = useScene().variables.get('secondary', '#999')
    const tertiary = useScene().variables.get('tertiary', 'violet')

    this.add(
      <Rect layout direction={'column'}>
        <Rect ref={this.windowControls}>
          <Rect
            fill="#222"
            stroke={tertiary()}
            lineWidth={3}
            padding={10}
            radius={12}
            alignItems={'center'}
          >
            <Circle
              fill={tertiary()}
              size={WINDOW_CONTROL_DIAMETER}
              marginRight={8}
            />
            <Circle
              fill={tertiary()}
              size={WINDOW_CONTROL_DIAMETER}
              marginRight={8}
            />
            <Circle
              fill={tertiary()}
              size={WINDOW_CONTROL_DIAMETER}
              marginRight={8}
            />
            <Txt fontSize={30} fill={secondary()} marginLeft={30}>
              {title}
            </Txt>
          </Rect>
        </Rect>
        <Rect
          width={600}
          height={400}
          stroke={tertiary()}
          lineWidth={4}
          marginTop={8}
          padding={16}
          radius={16}
          ref={this.windowShell}
        ></Rect>
      </Rect>
    )
  }

  *minimize(x: number, y: number, time = 0.8) {
    yield* all(
      ...this.windowShell()
        .children()
        .map((child) => child.opacity(0, Math.min(0.3, time))),
      this.windowControls().opacity(0, time),
      this.windowShell().size([100, 100], time),
      this.position([x, y], time),
      this.windowShell().fill('#222', time)
    )
  }

  *maximize(x: number, y: number, time = 0.8) {
    yield* all(
      ...this.windowShell()
        .children()
        .map((child) => child.opacity(DEFAULT, Math.min(0.3, time))),
      this.windowControls().opacity(DEFAULT, time),
      this.windowShell().size([600, 400], time),
      this.position([x, y], time),
      this.windowShell().fill('#444', time)
    )
  }

  *makeInactive() {
    yield* this.windowShell().fill('#222', 0.1)
  }
}

export default AppWindow
