import React, {
  createContext,
  useContext,
  useReducer,
  useImperativeHandle,
} from 'react'
import { v4 } from 'uuid'
import Notification from './Notification'

const NotificationContext = createContext()

function NotificationProvider(props) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [{ ...action.payload }, ...state]
      case 'REMOVE_NOTIFICATION':
        return state.filter(el => el.id !== action.id)
      default:
        return state
    }
  }, [])

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className='flex flex-col items-center gap-2 justify-start w-full fixed top-14 z-10'>
        {state.map(note => {
          return (
            <Notification dispatch={dispatch} key={note.id} id={note.id}>
              {note.message}
            </Notification>
          )
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const dispatch = useContext(NotificationContext)

  return props => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: v4(),
        ...props,
      },
    })
  }
}

// props => {
//   dispatch({
//     type: 'ADD_NOTIFICATION',
//     payload: {
//       id: v4(),
//       message: inputVal,
//     },
//   })
// }

// dispatch(props) {
//   dispatch({
//     type: 'ADD_NOTIFICATION',
//     payload: {
//       id: v4(),
//       ...props,
//     },
//   })
// }

export default NotificationProvider
