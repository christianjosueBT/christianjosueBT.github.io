import className from 'classnames'
import { LetterState } from '../utils/word-utils'

export default function Key({ children, state }) {
  const classes = className(
    'w-fit px-2 min-w-[2.5em] h-14 bg-neutral-500 rounded flex justify-center items-center font-mono font-bold',
    {
      'bg-neutral-700': state === LetterState.Miss,
      'bg-yellow-500': state === LetterState.Present,
      'bg-green-700': state === LetterState.Match,
    }
  )
  return (
    <div className={classes}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </div>
  )
}
