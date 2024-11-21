import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
// import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import Home from './Home'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}


