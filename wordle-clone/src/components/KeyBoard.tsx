import Key from './Key'

export default function KeyBoard() {
  const keysString1 = 'QWERTYUIOP'
  const keysString2 = 'ASDFGHJKL'
  const keysString3 = '1ZXCVBNM2'

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
    if (letter === '1') return <Key key={letter}>ENTER</Key>
    else if (letter === '2') return <Key key={letter}>&#xe14a;</Key>
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
