export default function Key({ children }) {
  return (
    <div
      className='w-fit px-2 min-w-[2em] h-14 bg-neutral-400 rounded
      flex justify-center items-center 
      font-sans font-bold'
    >
      {children}
    </div>
  )
}
