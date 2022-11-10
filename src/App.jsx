import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search'
import Contact from './components/Contact'
import Error from './components/Error'
import Profile from './components/Profile'

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

  return (
    <>
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} setErrorMsg={setErrorMsg}/>

      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="search" element={<Search />} />
        <Route path="contact" element={<Contact name={"Owais Dashti"} address={{street: "Apple Blv 6", town:"Lyngby", country: "Denmark"}} />} />
        <Route path="profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path='error' element={<Error errorMsg={errorMsg}/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default App
