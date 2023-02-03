import className from 'classnames'
import { MouseEventHandler } from 'react'
import { LetterState } from '../utils/word-utils'

interface KeyProps {
  children?: React.ReactNode // best, accepts everything React can render
  state?: LetterState
  addLetter?: Function
  handleClick?: MouseEventHandler<HTMLDivElement>
}

export default function Key({
  children,
  state,
  addLetter,
  handleClick,
}: KeyProps) {
  const classes = className(
    'px-2 min-w-[2.5em] h-14 bg-neutral-500 rounded flex justify-center items-center font-mono font-bold cursor-pointer',
    {
      'bg-neutral-700': state === LetterState.Miss,
      'bg-yellow-500': state === LetterState.Present,
      'bg-green-700': state === LetterState.Match,
    }
  )

  return (
    <div
      className={classes}
      onClick={addLetter ? () => addLetter(children) : handleClick}
    >
      {typeof children === 'string' ? children.toUpperCase() : children}
    </div>
  )
}
