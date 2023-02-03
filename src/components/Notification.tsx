import { useState, useEffect, useRef } from 'react'

interface NotificationProps {
  dispatch: Function
  id: string
  children?: React.ReactNode
}

function Notification({ dispatch, id, children }: NotificationProps) {
  const [opacity, setOpacity] = useState(true)

  useEffect(() => {
    // trigger fade out transition
    setTimeout(function () {
      setOpacity(false)
    }, 2000)
    // delete the notification from the state after fadeout
    setTimeout(function () {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        payload: { id },
      })
    }, 2300)
  }, [])

  return (
    <div
      className={`bg-neutral-100 rounded-lg px-4 py-2 text-black text-base font-boldSans transtition duration-300 ease-in-out ${
        opacity ? '' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export default Notification
