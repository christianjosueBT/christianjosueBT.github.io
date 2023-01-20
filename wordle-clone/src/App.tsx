import TileBoard from './components/TileBoard'
import KeyBoard from './components/KeyBoard'

function App() {
  return (
    <div className='flex flex-col justify-between'>
      <div className='flex justify-center w-screen '>
        <TileBoard />
      </div>
      <div className='flex justify-center w-screen '>
        <KeyBoard />
      </div>
    </div>
  )
}

export default App
