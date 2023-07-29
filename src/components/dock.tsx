import { Node, NodeProps, Rect, Txt } from '@motion-canvas/2d'
import { Center, makeRef, useScene } from '@motion-canvas/core'

interface Props extends NodeProps {
  /** The number of apps to show */
  apps: number
}
class Dock extends Node {
  private appsRef: Rect[] = []
  private indicatorsRef: Rect[] = []

  constructor({ apps, ...props }: Props) {
    super(props)

    const tertiary = useScene().variables.get('tertiary', '#444')

    this.add(
      <Rect
        layout
        stroke={tertiary}
        lineWidth={4}
        radius={24}
        padding={24}
        gap={24}
      >
        {Array.from({ length: apps }).map((_, i) => {
          return (
            <Rect
              layout
              direction="column"
              alignItems="center"
              ref={makeRef(this.appsRef, i)}
            >
              <Rect
                radius={16}
                stroke={tertiary}
                size={100}
                ref={makeRef(this.appsRef, i)}
                lineWidth={4}
              />
              <Rect
                ref={makeRef(this.indicatorsRef, i)}
                width={24}
                height={12}
                fill={tertiary}
                marginTop={16}
                radius={8}
                opacity={0}
              />
            </Rect>
          )
        })}
      </Rect>
    )
  }

  appAt(index: number) {
    return this.appsRef[index]
  }

  *makeActive(appIndex: number) {
    yield* this.indicatorsRef[appIndex].opacity(1, 0.5)
  }

  *makeInactive(appIndex: number) {
    yield* this.indicatorsRef[appIndex].opacity(0, 0.5)
  }
}

export default Dock
