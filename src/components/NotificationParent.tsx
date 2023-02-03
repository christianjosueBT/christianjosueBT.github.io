import React, {
  createContext,
  useContext,
  useReducer,
  useImperativeHandle,
} from 'react'
import { v4 } from 'uuid'
import Notification from './Notification'

interface NotificationProviderProps {
  children?: React.ReactNode // best, accepts everything React can render
}

interface state {
  id: string
  message: string
}

interface action {
  type: string
  payload: state
}

const NotificationContext = createContext<Function | null>(null)

function NotificationProvider(props: NotificationProviderProps) {
  const [state, dispatch] = useReducer(
    (state: state[], action: action): state[] => {
      console.log(state)
      switch (action.type) {
        case 'ADD_NOTIFICATION':
          return [{ ...action.payload }, ...state]
        case 'REMOVE_NOTIFICATION':
          return state.filter(el => el.id !== action.payload.id)
        default:
          return state
      }
    },
    []
  )

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

  return (message: string) => {
    if (dispatch)
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: v4(),
          message,
        },
      })
  }
}

export default NotificationProvider
