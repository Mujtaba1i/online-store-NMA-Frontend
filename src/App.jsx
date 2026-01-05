import { Route,Routes } from 'react-router'
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import styles from './App.module.css'

function App() {
  return (
      <>
      <Navbar/>
      <div className='testdivdiv'>NMA</div>
      <Routes>
        <Route path='/' element=<HomePage/> />
      </Routes>
      </>
  )
}

export default App