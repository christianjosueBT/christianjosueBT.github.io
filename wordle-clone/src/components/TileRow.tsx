import { useEffect, forwardRef } from 'react'
import Tile from './Tile'
import className from 'classnames'
import { LetterState } from '../utils/word-utils'

interface TileRowProps {
  word: string
  stateArray: LetterState[]
  rowState: RowState
}

enum RowState {
  None = '',
  Invalid = 'invalid',
  Valid = 'valid',
  Correct = 'correct',
}

const TileRow = forwardRef(function TileRow(props, ref) {
  const { word, stateArray, rowState, onAnimationEnd }: TileRowProps = props

  const tileContent = Array.from(word)
  for (let i = 0; i < 5; i++) {
    if (tileContent[i]) continue
    else tileContent[i] = ''
  }

  const classes = className('flex flex-row gap-1', {
    'animate-wiggle': rowState === RowState.Invalid,
  })

  return (
    <div className={classes} ref={ref}>
      {tileContent.map((letter, index) => {
        if (rowState === RowState.Valid || rowState === RowState.Correct) {
          let tileClass = className('duration-[0ms]', {
            'animate-flip delay-[225ms]': rowState === RowState.Valid,
            'animation-delay-200 delay-[500ms]':
              rowState === RowState.Valid && index === 1,
            'animation-delay-400 delay-[700ms]':
              rowState === RowState.Valid && index === 2,
            'animation-delay-600 delay-[900ms]':
              rowState === RowState.Valid && index === 3,
            'animation-delay-800 delay-[1100ms]':
              rowState === RowState.Valid && index === 4,
            'animate-bounce animation-delay-100': rowState === RowState.Correct,
            'animate-bounce animation-delay-200':
              rowState === RowState.Correct && index === 1,
            'animate-bounce animation-delay-300':
              rowState === RowState.Correct && index === 2,
            'animate-bounce animation-delay-400':
              rowState === RowState.Correct && index === 3,
            'animate-bounce animation-delay-500':
              rowState === RowState.Correct && index === 4,
          })
          if (index === 4)
            return (
              <Tile
                className={tileClass}
                letter={letter}
                key={index}
                state={stateArray[index]}
                onAnimationEnd={onAnimationEnd}
              />
            )
          else
            return (
              <Tile
                className={tileClass}
                letter={letter}
                key={index}
                state={stateArray[index]}
              />
            )
        } else
          return <Tile letter={letter} key={index} state={stateArray[index]} />
      })}
    </div>
  )
})

export default TileRow
export { RowState }
