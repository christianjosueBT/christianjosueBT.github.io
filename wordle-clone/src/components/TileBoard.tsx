import TileRow from './TileRow'

export default function TileBoard({ wordList, stateMatrix }) {
  // ****************************************************
  // FINAL OUTPUT
  // ****************************************************
  return (
    <div className='flex flex-col gap-2 items-stretch justify-center max-w-sm'>
      {wordList.map((word, index) => {
        return (
          <TileRow
            word={word}
            key={index}
            stateArray={stateMatrix[index]}
          ></TileRow>
        )
      })}
    </div>
  )
}
