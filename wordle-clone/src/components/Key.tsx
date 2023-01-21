export default function Key({ children }) {
  return (
    <div
      className='w-fit px-2 min-w-[2.5em] h-14 bg-neutral-500 rounded
      flex justify-center items-center 
      font-mono font-bold'
    >
      {children}
    </div>
  )
}
