import { useState, useEffect, useRef } from 'react'

function Notification({ dispatch, id, children }) {
  const [opacity, setOpacity] = useState(100)

  let classes = `opacity-${opacity} bg-neutral-100 rounded-lg px-4 py-2 text-black text-base font-boldSans transtition-opacity duration-500 ease-in-out`

  useEffect(() => {
    // trigger fade out transition
    setTimeout(function () {
      setOpacity(0)
    }, 2000)
    // delete the notification from the state after fadeout
    setTimeout(function () {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        id,
      })
    }, 2500)
  }, [])

  return <div className={classes}>{children}</div>
}

export default Notification
