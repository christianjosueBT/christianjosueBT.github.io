import Key from './Key'

export default function KeyBoard() {
  const keysString1 = 'QWERTYUIOP'
  const keysString2 = 'ASDFGHJKL'
  const keysString3 = '↵ZXCVBNM←'

  const keysArray1 = keysString1.split('')
  const keysArray2 = keysString2.split('')
  const keysArray3 = keysString3.split('')

  const renderedKeys1 = keysArray1.map(letter => (
    <Key key={letter}>{letter}</Key>
  ))
  const renderedKeys2 = keysArray2.map(letter => (
    <Key key={letter}>{letter}</Key>
  ))
  const renderedKeys3 = keysArray3.map(letter => {
    if (letter === '↵') return <Key key={letter}>ENTER</Key>
    else if (letter === '←')
      return (
        <Key key={letter}>
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
    else return <Key key={letter}>{letter}</Key>
  })

  return (
    <div className='flex flex-col items-stretch gap-2'>
      <div className='flex gap-2 justify-center'>{renderedKeys1}</div>
      <div className='flex gap-2 justify-center'>{renderedKeys2}</div>
      <div className='flex gap-2 justify-center'>{renderedKeys3}</div>
    </div>
  )
}
