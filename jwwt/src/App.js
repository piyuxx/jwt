import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function App() {
  return <BrowserRouter>

    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
}