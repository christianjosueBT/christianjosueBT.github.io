import { useState, useEffect, useRef } from 'react'

function Notification({ dispatch, id, children }) {
  const [opacity, setOpacity] = useState(100)
  console.log('NOTIFICATION DRAWN')
  console.log('opacity:', opacity)

  useEffect(() => {
    // trigger fade out transition
    setTimeout(function () {
      console.log('setting opacity to 0')
      setOpacity(0)
    }, 2000)
    // delete the notification from the state after fadeout
    setTimeout(function () {
      console.log('removing notification')
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        id,
      })
    }, 2200)
  }, [])

  return (
    <div
      className={`bg-neutral-100 rounded-lg px-4 py-2 text-black text-base font-boldSans transtition duration-300 ease-in-out opacity-${opacity}`}
    >
      {children}
    </div>
  )
}

export default Notification
