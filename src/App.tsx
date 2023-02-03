import { useState, useEffect, useRef, FC } from 'react'
import TileBoard from './components/TileBoard'
import { RowState } from './components/TileRow'
import KeyBoard from './components/KeyBoard'
import Modal from './components/Modal'
import { useNotification } from './components/NotificationParent'
import graph from './assets/images/graph.png'
import {
  words,
  LetterState,
  getRandomWord,
  computeStateArray,
} from './utils/word-utils'

function App() {
  // ************************************************************
  // SECTION FOR KEYBOARD
  // ************************************************************
  const [usedLetters, setUsedLetters] = useState(new Map())
  // updates usedLetters state to keep track of what letters have been used, and what is their correct LetterState
  const updateUsedLetters = (word: string, stateArray: LetterState[]) => {
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

  // ****************************************************
  // STATE FOR APP
  // ****************************************************
  const [wordList, setWordList] = useState(Array(6).fill(''))
  const [active, setActive] = useState(0)
  const [rowState, setRowState] = useState(RowState.None)
  const [stateMatrix, setStateMatrix] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(LetterState.Empty))
  )
  const [answer, setAnswer] = useState(getRandomWord().toLowerCase())
  const [isGameOver, setIsGameOver] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const boardRef = useRef<HTMLDivElement>(null)

  console.log('answer:', answer)

  // ****************************************************
  // FUNCTIONS FOR APP
  // ****************************************************
  const showNotification = useNotification()

  const handleGameRestart = () => {
    setWordList(Array(6).fill(''))
    setActive(0)
    setRowState(RowState.None)
    setStateMatrix(
      Array.from({ length: 6 }, () => Array(5).fill(LetterState.Empty))
    )
    setAnswer(getRandomWord().toLowerCase())
    setIsGameOver(false)
    setUsedLetters(new Map())
    setShowModal(false)
  }

  const handleCorrectGuess = () => {
    switch (active - 1) {
      case 0:
        return showNotification('🔥💯🔥!')
      case 1:
        return showNotification('🙌🙌🙌')
      case 2:
        return showNotification('👌👌👌')
      case 3:
        return showNotification('👍👍👍')
      case 4:
        return showNotification('🙏🙏🙏')
      case 5:
        return showNotification('😮‍💨😮‍💨😮‍💨')
    }
  }
  // after flip animation, check if guess was correct and set game state accordingly
  const handleAnimationEnd = () => {
    if (rowState === RowState.Correct) {
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
      return
    }
    if (stateMatrix[active - 1].every(el => el === LetterState.Match)) {
      setRowState(RowState.Correct)
      setIsGameOver(true)
      handleCorrectGuess()
      return
    }
    if (active === 6) {
      setIsGameOver(true)
      showNotification(answer)
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
    }
  }
  // triggers animation to play again without changing state if the ref has been attached to an element
  const triggerAnimation = (ref: React.Ref<HTMLDivElement>) => {
    if (ref && 'current' in ref) {
      if (ref.current) {
        let s = ref.current
        s.style.animation = 'none'
        // I had to do "let x =" here because my create-react-app config was yelling at me
        let x = s.offsetHeight // trigger reflow
        s.style.animation = ''
      }
    }
  }
  const addLetter = (letter: string) => {
    if (wordList[active].length >= 5) return

    const updatedWordList = wordList.map((word, index) => {
      if (index === active) return word + letter.toUpperCase()
      else return word
    })

    setWordList(updatedWordList)
    setRowState(RowState.None)
  }
  const deleteLetter = () => {
    if (wordList[active].length === 0) return

    const updatedWordList = wordList.map((word, index) => {
      if (index === active) return word.slice(0, -1)
      else return word
    })

    setWordList(updatedWordList)
    setRowState(RowState.None)
  }
  const handleEnter = () => {
    // not enough letters
    if (wordList[active].length !== 5) {
      setRowState(state => RowState.Invalid)
      triggerAnimation(boardRef)
      showNotification('Not enough letters')
      return
    }
    // invalid word
    if (!words.has(wordList[active].toLowerCase())) {
      setRowState(state => RowState.Invalid)
      triggerAnimation(boardRef)
      showNotification('Not in word list')
      return
    }
    // valid guess, compute state array for current row
    const stateArray = computeStateArray(wordList[active].toLowerCase(), answer)
    const newStateMatrix = stateMatrix.map((arr, i) => {
      if (i === active) return stateArray
      else return arr
    })
    // set state matrix, set row state (for animation purposes), set active row
    updateUsedLetters(wordList[active].toLowerCase(), stateArray)
    setStateMatrix(newStateMatrix)
    setRowState(RowState.Valid)
    setActive(active + 1)

    return
  }
  const handleKeydown = (event: KeyboardEvent) => {
    // if pressed key is an alphabet character
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      return addLetter(event.key)
    }
    // if pressed key is backspace
    if (event.key === 'Backspace') return deleteLetter()
    // if pressed key is enter
    if (event.key === 'Enter') handleEnter()
    else return
  }
  const handleShare = () => {
    navigator.clipboard.writeText('I won at fake wordle today!').then(
      () => {
        showNotification('Copied results to clipboard! 🤓✅📝')
      },
      () => {
        showNotification('Could not copy results to clipboard 😔❌📝')
      }
    )
  }

  // global keydown press event listener and handler
  useEffect(() => {
    if (!isGameOver) document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [wordList, active, isGameOver])

  // *********************************************************
  // SECTION FOR MODAL
  // *********************************************************
  const handleClose = () => {
    setShowModal(false)
  }

  const actionBar = (
    <div className='flex justify-evenly gap-1 text-white font-clearSans'>
      <button
        onClick={handleGameRestart}
        className='flex flex-initial justify-center items-center px-3 py-2 rounded-full border border-green-500 bg-green-500'
      >
        Play again &#8635;
      </button>
      <button
        onClick={handleShare}
        className='flex flex-initial justify-center items-center px-3 py-2 rounded-full border border-neutral-500 bg-neutral-500'
      >
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

  let speed = Math.random()
  let speedToComplete = ''
  switch (true) {
    case speed <= 0.33:
      speedToComplete = 'Fast'
      break
    case speed > 0.33 && speed <= 0.66:
      speedToComplete = 'Average'
      break
    case speed > 0.66:
      speedToComplete = 'Slow'
      break
  }

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <h4 className='text-center'>STATISTICS</h4>
      <div className='flex justify-center items-baseline gap-4'>
        <div className='flex flex-col justify-center leading-4 max-w-[5rem]'>
          <h2 className='text-4xl'>{Math.floor(Math.random() * 10)}</h2>
          <p className='font-clearSans'>
            Played <br />
            (I think)
          </p>
        </div>
        <div className='flex flex-col justify-center leading-4 max-w-[5rem]'>
          <h2 className='text-4xl'>{Math.floor(Math.random() * 100)}</h2>
          <p className='font-clearSans'>Win % (Rough estimate)</p>
        </div>
        <div className='flex flex-col justify-center leading-4 max-w-[5rem]'>
          {/* <h2 className='text-4xl'>{Math.random() > 0.5 ? 'Fast' : 'Slow'}</h2> */}
          <h2 className='text-4xl'>{speedToComplete}</h2>
          <p className='font-clearSans'>Time*</p>
        </div>
        <div className='flex flex-col justify-center leading-4 max-w-[5rem]'>
          <h2 className='text-4xl'></h2>
          <p className='font-clearSans'></p>
        </div>
      </div>
      <h3>GUESS DISTRIBUTION</h3>
      <div>
        I don't want to make a graph for a game no one is going to play 😔
        <br /> Here's a graph showing my happiness versus hours without coffee
        instead 🙂
        <img
          src={graph}
          alt='graph showing decreasing happines as a function of time without coffee'
        />
      </div>
      <p className='self-start text-sm'>
        * Relative to control group of 10 year-olds 👶👶👶
      </p>
    </Modal>
  )

  // ****************************************************
  // FINAL OUTPUT
  // ****************************************************
  return (
    <div className='h-[calc(100%-13rem)]'>
      {showModal && modal}
      <header className='flex justify-center items-center h-16 mx-4'>
        <div
          className='mr-auto cursor-pointer'
          onClick={() =>
            showNotification(
              'HUZZAH! THIS IS ONLY FOR STYLING PURPOSES! THERE IS NOTHING TO SEE HERE!'
            )
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            className='w-5 fill-neutral-100'
          >
            <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
          </svg>
        </div>
        <h3 className='font-karnak font-bold tracking-wide text-4xl text-center'>
          Wordle
        </h3>
        <div
          className='ml-auto cursor-pointer'
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            className='w-8 fill-neutral-100'
          >
            <path d='M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z' />
          </svg>
        </div>
      </header>
      <hr className='border-neutral-700' />
      <div className='h-[calc(100%-theme(spacing.16))] flex flex-col justify-evenly'>
        <div className='flex justify-center '>
          <TileBoard
            ref={boardRef}
            wordList={wordList}
            stateMatrix={stateMatrix}
            active={active}
            rowState={rowState}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
        <div className='flex justify-center'>
          <KeyBoard
            usedLetters={usedLetters}
            addLetter={addLetter}
            deleteLetter={deleteLetter}
            handleEnter={handleEnter}
          />
        </div>
      </div>
    </div>
  )
}

export default App
