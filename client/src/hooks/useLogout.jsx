import { useAuthContext } from './useAuthContext'
import {  useTaskContext } from './useTaskContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTasks } = useTaskContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTasks({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}