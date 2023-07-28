import { Node, Rect, makeScene2D } from '@motion-canvas/2d'
import { CodeBlock, insert } from '@motion-canvas/2d/lib/components/CodeBlock'
import {
  all,
  createRef,
  easeInCubic,
  easeInOutSine,
  sequence,
  useScene,
  waitFor,
  waitUntil,
} from '@motion-canvas/core'
import Mouse from '../../components/mouse'
import FileItem from '../../components/file-item'

export default makeScene2D(function* (view) {
  view.fill('#222')
  view.fontFamily('Zed Mono')
  view.fontSize(32)
  yield* waitUntil('silenceends')

  const foreground = useScene().variables.get('foreground', '#fefefe')

  const mouse = createRef<Mouse>()
  view.add(<Mouse zIndex={10} position={[-970, 600]} ref={mouse} />)
  mouse().opacity(0)

  const modelContainerRef = createRef<Rect>()
  const explorerRef = createRef<Rect>()
  view.add(
    <Rect
      ref={explorerRef}
      lineWidth={4}
      fill="#282828"
      radius={16}
      offset={[-1, 1]}
      position={[-700, 400]}
      padding={10}
      layout
      direction="column"
    >
      <FileItem name="public/" type="folder" />
      <FileItem name="favicon.ico" indent={1} />
      <Rect ref={modelContainerRef} height={0} offsetY={-1}></Rect>
      <FileItem name="src/" type="folder" />
      <FileItem name="index.html" indent={1} />
      <FileItem name="app.js" indent={1} selected />
      <FileItem name="package.json" />
      <FileItem name="yarn.lock" />
    </Rect>
  )

  const editorRef = createRef<Rect>()
  view.add(
    <Rect
      ref={editorRef}
      fill="#1e1e1e"
      offset={[-1, -1]}
      position={[-150, -500]}
      padding={30}
      radius={16}
      layout
    />
  )

  explorerRef()
    .children()
    .forEach((child) => child.opacity(0))

  yield* sequence(
    0.2,
    explorerRef().size([500, 900], 0.5, easeInCubic),
    editorRef().size([800, 900], 0.5, easeInCubic),
    sequence(
      0.1,
      ...explorerRef()
        .children()
        .map((child) => child.opacity(1, 0.2))
    ),
    mouse().enter()
  )

  const initialCode = `function Mesh() {
  return null
}

function App() {

  return (
    <Canvas>
      <Mesh />
    </Canvas>
  )
}`

  const codeblock = createRef<CodeBlock>()
  yield editorRef().add(
    <CodeBlock
      fontFamily="Calling Code"
      fontSize={35}
      language="jsx"
      code={initialCode}
      offset={[-1, -1]}
      ref={codeblock}
    />
  )

  yield* codeblock().opacity(0).opacity(1, 0.5)

  yield* all(mouse().enter(), mouse().press())

  const fileRef = createRef<Rect>()
  view.add(
    <Rect
      ref={fileRef}
      fill={'#444'}
      position={() => mouse().position().addY(20)}
      width={80}
      height={100}
      radius={16}
    />
  )

  yield* all(
    mouse().y(-400, 0.5, easeInOutSine),
    mouse().x(-700, 0.6, easeInOutSine)
  )
  yield* all(
    mouse().y(-450, 0.5, easeInOutSine),
    mouse().x(-500, 0.5, easeInOutSine)
  )

  yield* mouse().release()

  yield* all(
    fileRef().height(0, 0.3),
    fileRef().width(400, 0.3),
    fileRef().radius(2, 0.3)
  )

  yield* modelContainerRef().height(55, 0.5)
  const modelFile = createRef<Rect>()
  modelContainerRef().add(
    <Node ref={modelFile}>
      <FileItem name="sketchfab-racer-model.glb" indent={1} />
    </Node>
  )

  yield* modelFile().opacity(0).opacity(1, 0.3)

  yield* waitFor(1)

  yield* sequence(
    1,
    codeblock().edit(1)`
function Mesh() {
  ${insert(`const glb = useGltf(
    '/sketchfab-racer-model.glb'
  )

  console.log('model', glb)`)}
  return null
}

function App() {

  return (
    <Canvas>
      <Mesh />
    </Canvas>
  )
}`,
    mouse().position([400, -200], 1),
    mouse().leave()
  )

  yield* waitUntil('codeoptionends')
})
