import { useState } from 'react'
import TileBoard from './components/TileBoard'
import KeyBoard from './components/KeyBoard'
import Modal from './components/Modal'

function App() {
  // ************************************************************
  // SECTION FOR KEYBOARD
  // ************************************************************
  const [usedLetters, setUsedLetters] = useState(new Map())
  // this updates usedLetters state to keep track of what letters have been used, and what is their appropriate LetterState
  const handleSubmittedWord = (word, stateArray) => {
    const newMap = new Map(usedLetters)

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

  // *********************************************************
  // SECTION FOR MODAL
  // *********************************************************
  const [isGameOver, setIsGameOver] = useState(false)

  const handleGameOver = () => {
    setIsGameOver(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const actionBar = (
    <div className='flex justify-evenly text-white font-clearSans'>
      <button className='flex justify-center items-center px-3 py-2 rounded-full border min-w-[12rem] border-green-500 bg-green-500'>
        Play again &#8635;
      </button>
      <button className='flex justify-center items-center px-3 py-2 rounded-full border min-w-[12rem] border-neutral-500 bg-neutral-500'>
        Share
        <svg
          id='AuthCTA-module_shareIcon__WGE7Z'
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          data-testid='icon-share'
          className='pl-2'
        >
          <path
            fill='white'
            d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
          ></path>
        </svg>
      </button>
    </div>
  )

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <h4 className='text-center'>STATISTICS</h4>
      <div className='flex justify-evenly items-baseline'>
        <div className='flex flex-col justify-center max-w-[3rem]'>
          <h2 className='text-4xl'>16</h2>
          <p className='font-clearSans'>Played</p>
        </div>
        <div className='flex flex-col justify-center max-w-[3rem]'>
          <h2 className='text-4xl'>50</h2>
          <p className='font-clearSans'>Win %</p>
        </div>
        <div className='flex flex-col justify-center max-w-[3rem]'>
          <h2 className='text-4xl'>1</h2>
          <p className='font-clearSans'>Current Streak</p>
        </div>
        <div className='flex flex-col justify-center max-w-[3rem]'>
          <h2 className='text-4xl'>1</h2>
          <p className='font-clearSans'>Max Streak</p>
        </div>
      </div>
      <h3>GUESS DISTRIBUTION</h3>
      <div>
        I don't want to make a graph for a game no one is going to play :(
        <br /> Have a graph showing my happiness versus hours without coffee
      </div>
    </Modal>
  )

  // ****************************************************
  // FINAL OUTPUT
  // ****************************************************

  return (
    <div className='h-[calc(100%-13rem)]'>
      {isGameOver && modal}
      <header className='flex flex-col justify-center items-center h-16'>
        <h3 className='font-karnak font-bold tracking-wide text-4xl'>Wordle</h3>
      </header>
      <hr className='border-neutral-700' />
      <div className='h-[calc(100%-theme(spacing.16))] flex flex-col justify-evenly'>
        <div className='flex justify-center '>
          <TileBoard
            handleSubmittedWord={handleSubmittedWord}
            handleGameOver={handleGameOver}
          />
        </div>
        <div className='flex justify-center'>
          <KeyBoard usedLetters={usedLetters} />
        </div>
      </div>
    </div>
  )
}

export default App
