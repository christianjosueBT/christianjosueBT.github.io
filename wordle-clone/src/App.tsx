import TileBoard from './components/TileBoard'
import KeyBoard from './components/KeyBoard'

function App() {
  return (
    <div className='h-[calc(100%-13rem)]'>
      <header
        className='flex flex-col justify-center items-center h-16' // this and previous classes add a line after the header
      >
        <h6 className='text-4xl font-karnak font-bold tracking-wide'>Wordle</h6>
      </header>
      <hr className='border-neutral-700' />
      <div className='h-[calc(100%-theme(spacing.16))] flex flex-col justify-evenly'>
        <div className='flex justify-center w-screen '>
          <TileBoard />
        </div>
        <div className='flex justify-center w-screen '>
          <KeyBoard />
        </div>
      </div>
    </div>
  )
}

export default App
