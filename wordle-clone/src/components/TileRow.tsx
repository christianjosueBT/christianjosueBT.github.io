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
  // const rowDiv = useRef()
  // if (rowState === RowState.Invalid) {
  //   let r = rowDiv.current
  //   console.log('r:', r)
  //   r.style.animation = 'none'

  //   let x = r.offsetHeight
  //   r.style.animation = null
  // }
  const { word, stateArray, rowState }: TileRowProps = props

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
          let tileClass = className('transition-colors duration-200', {
            'animate-flip': rowState === RowState.Valid,
            'animate-win': rowState === RowState.Correct,
            'animation-delay-200 delay-300': index === 1,
            'animation-delay-400 delay-[550ms]': index === 2,
            'animation-delay-600 delay-[800ms]': index === 3,
            'animation-delay-800 delay-[1050ms]': index === 4,
          })
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
