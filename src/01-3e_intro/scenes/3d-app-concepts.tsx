import { Rect, Txt, makeScene2D } from '@motion-canvas/2d'
import {
  all,
  chain,
  createRef,
  fadeTransition,
  makeRef,
  sequence,
  useScene,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'

const concepts = [
  'Modelling',
  'Rendering',
  'Shaders+Editors',
  'UV Unwrapping',
  'Sculpting',
  'Physics*',
  'Geometry nodes',
  'Texture baking',
  'and more more more...',
]

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')
  view.fontSize(42)

  const foreground = useScene().variables.get('foreground', '#fefefe')

  yield* fadeTransition()

  const conceptNodes: Rect[] = []
  const container = createRef<Rect>()

  view.add(
    <Rect layout offsetY={-0.75} direction="column" ref={container}>
      {concepts.map((concept, i) => (
        <Rect
          fill="#444"
          opacity={0}
          radius={16}
          padding={16}
          ref={makeRef(conceptNodes, i)}
          margin={[20, 0]}
        >
          <Txt fill={foreground}>{concept}</Txt>
        </Rect>
      ))}
    </Rect>
  )

  yield* all(
    container().offset([0, 1], 7),
    sequence(
      0.4,
      ...conceptNodes.map((node, i) =>
        chain(
          node.opacity(1, 0.4),
          waitFor(2),
          node.opacity(i === concepts.length - 1 ? 1 : 0, 0.3)
        )
      )
    )
  )

  yield* waitUntil('checkend')

  yield* sequence(0.7, container().filters.blur(20, 1), container().opacity(0, 0.3))
})
