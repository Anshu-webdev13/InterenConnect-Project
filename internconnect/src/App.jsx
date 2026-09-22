import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home.jsx'
import {Routes, Route} from 'react-router-dom'
import Interenship from './pages/Internship.jsx'
import Internshipdetails from './pages/Internshipdetails.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={< Interenship />} />
        <Route path="/internshipdetails" element={<Internshipdetails />} />
      </Routes>
     
    </div>
  );
}

export default App
