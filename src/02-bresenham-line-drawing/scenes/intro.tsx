import { Line, Txt, makeScene2D, Node, Rect } from '@motion-canvas/2d'
import {
  chain,
  createRef,
  sequence,
  useScene,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')
  view.fontSize(24)

  const foreground = useScene().variables.get('foreground', '#ff0000')
  const secondary = useScene().variables.get('secondary', '#ff0000')
  const red = useScene().variables.get('red', '#f00')
  const green = useScene().variables.get('green', '#0f0')

  yield* waitUntil('audiostarts')

  const node = createRef<Node>()
  const line = createRef<Line>()
  const p1 = createRef<Txt>()
  const p2 = createRef<Txt>()
  view.add(
    <Node opacity={0} ref={node}>
      <Line
        points={[
          [0, 0],
          [200, -200],
        ]}
        stroke={foreground}
        lineWidth={4}
        offsetX={1}
        ref={line}
        lineCap="round"
      />

      <Txt
        position={[-100, 20]}
        fill={secondary}
        fontSize={20}
        opacity={0}
        ref={p1}
      >
        P₁ (3, 2)
      </Txt>
      <Txt position={[100, -220]} fill={secondary} fontSize={20} opacity={0} ref={p2}>
        P₂ (12, 11)
      </Txt>
    </Node>
  )

  yield* sequence(
    0.25,
    node().opacity(1, 0.5),
    p1().opacity(1, 0.3),
    p2().opacity(1, 0.3)
  )

  yield* waitUntil('mentiondx')

  yield* p1().position(p1().position().addY(20), 0.5)

  const dxLine = createRef<Line>()
  const dyLine = createRef<Line>()
  view.add(
    <>
      <Line
        lineCap="round"
        stroke={red}
        ref={dxLine}
        opacity={0}
        points={[
          [0, 0],
          [200, 0],
        ]}
        lineWidth={3}
        offsetX={1}
        position={[0, 10]}
      />

      <Line
        lineCap="round"
        stroke={green}
        ref={dyLine}
        opacity={0}
        points={[
          [110, -200],
          [110, 0],
        ]}
        lineWidth={3}
      />
    </>
  )

  const dxCalc = createRef<Rect>()
  const dyCalc = createRef<Rect>()
  const equal = createRef<Txt>()

  view.add(
    <Rect layout position={[0, 150]} gap={50}>
      <Rect alignItems="end" direction="column" ref={dxCalc} opacity={0}>
        <Txt fill={red}>dx</Txt>
        <Txt fill={foreground}> = 12 - 3</Txt>
        <Txt fill={foreground}> = 9</Txt>
      </Rect>

      <Txt ref={equal} fill={foreground} opacity={0}>
        =
      </Txt>

      <Rect direction="column" ref={dyCalc} opacity={0}>
        <Txt fill={green}>dy</Txt>
        <Txt fill={foreground}>11 - 2</Txt>
        <Txt fill={foreground}>9</Txt>T
      </Rect>
    </Rect>
  )

  yield* chain(
    dxLine().opacity(1, 0.5),
    dxCalc().opacity(1, 0.5),
    equal().opacity(1, 0.5),
    dyLine().opacity(1, 0.5),
    waitFor(0.5),
    dyCalc().opacity(1, 0.5)
  )

  yield* waitUntil('introends')
})
