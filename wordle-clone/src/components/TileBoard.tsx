import TileRow from './TileRow'

export default function TileBoard() {
  return (
    <div className='flex flex-col gap-2 items-stretch justify-center max-w-sm'>
      <TileRow></TileRow>
      <TileRow></TileRow>
      <TileRow></TileRow>
      <TileRow></TileRow>
      <TileRow></TileRow>
      <TileRow></TileRow>
    </div>
  )
}
