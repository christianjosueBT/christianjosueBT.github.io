import { forwardRef } from 'react'
import TileRow, { RowState } from './TileRow'

const TileBoard = forwardRef(function TileBoard(props, ref) {
  const { wordList, stateMatrix, active, rowState } = props
  // ****************************************************
  // FINAL OUTPUT
  // ****************************************************
  return (
    <div className='flex flex-col gap-2 items-stretch justify-center max-w-sm'>
      {wordList.map((word, index) => {
        if (rowState !== RowState.None && index === active)
          return (
            <TileRow
              ref={ref}
              key={index}
              word={word}
              stateArray={stateMatrix[index]}
              rowState={rowState}
            ></TileRow>
          )
        else
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
