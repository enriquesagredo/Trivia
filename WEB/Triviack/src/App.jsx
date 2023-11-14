
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing page/Landing'
import Register from './components/Register/Register'
import Footer from './components/Footer/Footer'
import FastGame from './components/Pages/FastGamePage/Fastgame'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Authenticated, Unauthenticated } from '../src/components/authenticated'
import Login from './components/Login/login'

function App() {
  return (
    <>
    <div className="App">
      <Navbar />
      
      <div className="container py-5">
        <Routes>
          <Route
            path="/home"
            element={
              <Unauthenticated>
                <Landing />
              </Unauthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <Unauthenticated>
                <Login />
              </Unauthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <Unauthenticated>
                <Register />
              </Unauthenticated>
            }
          />

          <Route
            path="/fastgame"
            element={
              <Unauthenticated>
                <FastGame />
              </Unauthenticated>
            }
          />

          <Route
            path="/tasks/:id/edit"
            element={
              <Unauthenticated>
              <FastGame />
            </Unauthenticated>
            }
          />

          <Route
            path="/tasks/:id"
            element={
              <Unauthenticated>
              <FastGame />
            </Unauthenticated>
            }
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
    
    <div><Footer /></div>
    </>
  );
}


export default App
