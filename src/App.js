import React from 'react'
import Login from './Component/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Component/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App