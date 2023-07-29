import { Txt, makeScene2D } from "@motion-canvas/2d";
import { Direction, slideTransition, waitUntil } from "@motion-canvas/core";


export default makeScene2D(function* (view) {
  view.fill('#222')

  yield* slideTransition(Direction.Top)

  view.add(<Txt>Todos</Txt>)

  yield* waitUntil('end')
})