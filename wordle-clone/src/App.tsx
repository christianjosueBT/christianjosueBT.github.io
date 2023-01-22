import { useState } from 'react'
import TileBoard from './components/TileBoard'
import KeyBoard from './components/KeyBoard'

function App() {
  const [usedLetters, setUsedLetters] = useState(new Map())

  const handleWordSubmit = (word, stateArray) => {
    const newMap = new Map(usedLetters)
    console.log('stateArray:', stateArray)

    for (let i = 0; i < word.length; i++) {
      newMap.set(
        word[i],
        newMap.get(word[i]) > stateArray[i] // if current letter has a greater value assigned in map, don't change that value
          ? newMap.get(word[i])
          : stateArray[i]
      )
    }
    setUsedLetters(newMap)
  }

  return (
    <div className='h-[calc(100%-13rem)]'>
      <header className='flex flex-col justify-center items-center h-16'>
        <h3 className='font-karnak font-bold tracking-wide text-4xl'>Wordle</h3>
      </header>
      <hr className='border-neutral-700' />
      <div className='h-[calc(100%-theme(spacing.16))] flex flex-col justify-evenly'>
        <div className='flex justify-center '>
          <TileBoard handleWordSubmit={handleWordSubmit} />
        </div>
        <div className='flex justify-center'>
          <KeyBoard usedLetters={usedLetters} />
        </div>
      </div>
    </div>
  )
}

export default App
