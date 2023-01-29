import React, { useReducer, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import Notification from './Notification'

const NotificationParent = forwardRef(function NotificationParent(props, ref) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, { ...action.payload }]
      case 'REMOVE_NOTIFICATION':
        return state.filter(el => el.id !== action.id)
      default:
        return state
    }
  }, [])

  useImperativeHandle(ref, () => ({
    dispatch(props) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: v4(),
          ...props,
        },
      })
    },
    alert() {
      alert('CALLED COMPONENT FUNCTION FROM THE OUTSIDE?!?!?!')
    },
  }))

  return ReactDOM.createPortal(
    <div className='flex flex-col items-center gap-2 justify-start w-full fixed top-14'>
      {state.map(note => {
        return (
          <Notification dispatch={dispatch} key={note.id} id={note.id}>
            {note.message}
          </Notification>
        )
      })}
    </div>,
    document.querySelector('.modal-container')
  )
})

// props => {
//   dispatch({
//     type: 'ADD_NOTIFICATION',
//     payload: {
//       id: v4(),
//       message: inputVal,
//     },
//   })
// }

export default NotificationParent
