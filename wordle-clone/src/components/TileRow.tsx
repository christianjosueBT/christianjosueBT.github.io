import Tile from './Tile'
import { LetterState } from '../utils/word-utils'

interface TileRowProps {
  word: string
  stateArray: LetterState[]
}

export default function TileRow({ word, stateArray }: TileRowProps) {
  const splitWord = word.split('')

  const tileContent = Array(5).fill('')
  for (const [index, letter] of splitWord.entries()) tileContent[index] = letter

  return (
    <div className='flex flex-row gap-1'>
      {tileContent.map((letter, index) => (
        <Tile letter={letter} key={index} state={stateArray[index]} />
      ))}
    </div>
  )
}
