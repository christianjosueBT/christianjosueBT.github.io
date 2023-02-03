import { forwardRef } from 'react'
import TileRow, { RowState } from './TileRow'
import { LetterState } from '../utils/word-utils'

interface TileBoardProps {
  wordList: string[]
  stateMatrix: LetterState[][]
  active: number
  rowState: RowState
  onAnimationEnd: Function
}

const TileBoard = forwardRef(function TileBoard(
  props: TileBoardProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { wordList, stateMatrix, active, rowState, onAnimationEnd } = props
  // ****************************************************
  // FINAL OUTPUT
  // ****************************************************
  return (
    <div className='flex flex-col gap-2 items-stretch justify-center max-w-sm'>
      {wordList.map((word, index) => {
        if (rowState === RowState.Invalid && index === active)
          return (
            <TileRow
              ref={ref}
              key={index}
              word={word}
              stateArray={stateMatrix[index]}
              rowState={rowState}
            ></TileRow>
          )
        else if (
          (rowState === RowState.Valid || rowState === RowState.Correct) &&
          index === active - 1
        ) {
          return (
            <TileRow
              ref={ref}
              key={index}
              word={word}
              stateArray={stateMatrix[index]}
              rowState={rowState}
              onAnimationEnd={onAnimationEnd}
            ></TileRow>
          )
        } else
          return (
            <TileRow
              key={index}
              word={word}
              stateArray={stateMatrix[index]}
            ></TileRow>
          )
      })}
    </div>
  )
})

export default TileBoard
