import { createContext, useReducer } from 'react'

export const TaskContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        tasks: action.payload,
      };
    
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks],
      };
    
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id),
      };
    
      case 'UPDATE_TASK':
        return {
          tasks: state.tasks.map(task => 
            task._id === action.payload._id ? action.payload : task
          )
          
        };
      
    default:
      return state;
  }
};


export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: []
  })

  return (
    <TaskContext.Provider value={{...state, dispatch}}>
      { children }
    </TaskContext.Provider>
  )
}