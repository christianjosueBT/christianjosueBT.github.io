import Tile from './Tile'
import { LetterState } from '../utils/word-utils'

interface TileRowProps {
  word: string
  stateArray: LetterState[]
}

export default function TileRow({ word, stateArray }: TileRowProps) {
  const tileContent = Array.from(word)

  for (let i = 0; i < 5; i++) {
    if (tileContent[i]) continue
    else tileContent[i] = ''
  }

  return (
    <div className='flex flex-row gap-1'>
      {tileContent.map((letter, index) => (
        <Tile letter={letter} key={index} state={stateArray[index]} />
      ))}
    </div>
  )
}
