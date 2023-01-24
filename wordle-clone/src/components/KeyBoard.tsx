import Key from './Key'

export default function KeyBoard({
  usedLetters,
  addLetter,
  deleteLetter,
  handleEnter,
}) {
  const keysString1 = 'QWERTYUIOP',
    keysString2 = 'ASDFGHJKL',
    keysString3 = '↵ZXCVBNM←'

  const renderedKeys = [[...keysString1], [...keysString2], [...keysString3]]

  for (let i = 0; i < renderedKeys.length; i++) {
    renderedKeys[i] = renderedKeys[i].map(letter => {
      letter = letter.toLowerCase()
      if (letter === '↵')
        return (
          <Key key={letter} handleClick={handleEnter}>
            ENTER
          </Key>
        )
      // if key is backspace
      if (letter === '←')
        return (
          <Key key={letter} handleClick={deleteLetter}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='18'
              viewBox='0 0 24 18'
            >
              <g
                fill='none'
                fillRule='evenodd'
                stroke='#fff'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                transform='translate(1 1)'
              >
                <path d='M20 0H7L0 8l7 8h13a2 2 0 002-2V2a2 2 0 00-2-2zM17 5l-6 6M11 5l6 6' />
              </g>
            </svg>
          </Key>
        )
      // if key is alphabet character and has been used
      // if (usedLetters.has(letter))
      //   return (
      //     <Key key={letter} state={usedLetters.get(letter)}>
      //       {letter}
      //     </Key>
      //   )
      // if key is alphabet character and has not been used
      else
        return (
          <Key
            key={letter}
            addLetter={addLetter}
            state={usedLetters.get(letter) || 1}
          >
            {letter}
          </Key>
        )
    })
  }

  return (
    <div className='flex flex-col items-stretch gap-2'>
      <div className='flex gap-2 justify-center'>{renderedKeys[0]}</div>
      <div className='flex gap-2 justify-center'>{renderedKeys[1]}</div>
      <div className='flex gap-2 justify-center'>{renderedKeys[2]}</div>
    </div>
  )
}
