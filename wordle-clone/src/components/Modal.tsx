import ReactDOM from 'react-dom'
import { useEffect } from 'react'

function Modal({ onClose, actionBar, children }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  return ReactDOM.createPortal(
    <div className='font-boldSans'>
      <div
        onClick={onClose}
        className='fixed inset-0 bg-[rgb(0,0,0,0.5)]'
      ></div>
      <div className='fixed inset-x-[25rem] inset-y-[13rem] p-10 bg-neutral-900 rounded-lg border border-neutral-800'>
        <div className='flex flex-col justify-between h-full'>
          {children}
          {actionBar}
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  )
}

export default Modal
