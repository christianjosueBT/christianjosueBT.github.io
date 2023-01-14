import Tile from './Tile'

export default function TileRow() {
  return (
    <div className='flex flex-row gap-1'>
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </div>
  )
}
