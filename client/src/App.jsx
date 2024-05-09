import React, { useContext, useState } from 'react'
import Admin from './Admin'
import Guest from './Guest';
import { GlobalContext } from './Context/context';
import './App.css';
export default function App() {

  const { state, dispatch } = useContext(GlobalContext)

  const getUserStatus = () => {
    if (state.user == 'undefined' || state.user == undefined) {
      return false
    }
    else {
      return true
    }

  }

  const getUser = getUserStatus()

  return (
    <>
     <div>
      {getUser ? <Admin /> : <Guest />}</div>

    </>


  )
}
