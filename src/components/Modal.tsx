import ReactDOM from 'react-dom'
import { useEffect } from 'react'

interface ModalProps {
  onClose: Function
  actionBar: React.ReactNode
  children?: React.ReactNode
}

function Modal({ onClose, actionBar, children }: ModalProps) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  const modalContainer = document.querySelector('.modal-container')

  return modalContainer
    ? ReactDOM.createPortal(
        <div className='font-boldSans absolute w-full h-screen flex flex-col items-center justify-center'>
          <div
            onClick={() => onClose()}
            className='bg-[rgb(0,0,0,0.5)] absolute inset-0'
          ></div>
          <div
            className='bg-neutral-900 rounded-lg border border-neutral-800 
      absolute p-6 max-w-[100%] sm:w-[32rem]
      flex flex-col'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-6 fill-white cursor-pointer self-end'
              onClick={() => onClose()}
            >
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
            <div className='flex flex-col justify-between items-center gap-4 overflow-auto'>
              {children}
              {actionBar}
            </div>
          </div>
        </div>,
        modalContainer
      )
    : null
}

export default Modal
