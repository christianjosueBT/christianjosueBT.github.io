import className from 'classnames'
import { LetterState } from '../utils/word-utils'

interface TileProps {
  letter: string
  state: number
}

export default function Tile({ letter, state }) {
  const classes = className(
    'w-16 h-16 border-solid border-2 border-neutral-700 flex justify-center items-center font-sans font-bold text-3xl',
    {
      'border-0 bg-neutral-700': state === LetterState.Miss,
      'border-0 bg-yellow-500': state === LetterState.Present,
      'border-0 bg-green-700': state === LetterState.Match,
    }
  )

  return <div className={classes}>{letter}</div>
}
