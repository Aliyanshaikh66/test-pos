import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";

export const GlobalContext = createContext("Initial Value");



let data = {
    user: Cookies.get('token')
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        Cookies.set('token', state.user)
    }, [state.user])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}