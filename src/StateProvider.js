import React,{createContext,useReducer, useContext} from 'react'

const StateContext = createContext();

const StateProvider = ({reducer, initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

const useStateValue = ()=> useContext(StateContext);

export default StateProvider;
export {StateContext,useStateValue};