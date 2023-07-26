import { Rect, Txt } from '@motion-canvas/2d'
import { useScene } from '@motion-canvas/core'

interface Props {
  name: string
  type?: 'file' | 'folder'
  indent?: number
  selected?: boolean
}

function FileItem({ indent = 0, name, selected, type = 'file' }: Props) {
  const secondary = useScene().variables.get('secondary', '#fefefe')

  const isFolder = type === 'folder'
  const icon =  isFolder ? '> ' : ''

  return (
    <Rect
      fill={selected ? '#444' : '#0000'}
      padding={[10, 10]}
      marginLeft={indent * 32 + (isFolder ? 0 : 20)}
      radius={8}
    >
      <Txt fill={secondary}>{icon + name}</Txt>
    </Rect>
  )
}

export default FileItem
