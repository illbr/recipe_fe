import { useState } from 'react'
import { Navigate, Route, Routes, BrowserRouter, Link, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Menu from './pages/menu'
import Like from './pages/menu/like';
import UpdateMenu from './pages/UpdateMenu'
import AddMenu from './pages/inputmenu';
import SearchMenu from './pages/SearchMenu';
import MenuById from './pages/SearchMenu/_id';
import Login from './pages/Auth/Login'
import AuthChecker from './components/AuthChecker'
import Register from './pages/Auth/Register';
import DetailProfile from './pages/Profile/DetailProfile';
import LandingPage from './pages/landing';
import Bookmark from './pages/menu/bookmark';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/landing" replace={true} />} />
          <Route path='/menu' element={<AuthChecker><Menu/></AuthChecker>} />
          <Route path='/likeMenu' element={<AuthChecker><Like/></AuthChecker>} />
          <Route path='/bookmarkMenu' element={<AuthChecker><Bookmark/></AuthChecker>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/update-menu/:menuId' element={<AuthChecker><UpdateMenu /></AuthChecker>} />
          <Route path='/input-menu' element={<AuthChecker><AddMenu /></AuthChecker>} />
          <Route path='/search-menu' element={<AuthChecker><SearchMenu /></AuthChecker>} />
          <Route path='/detail-menu/:id' element={<AuthChecker><MenuById /></AuthChecker>} />
          <Route path='/detail-profile/:id' element={<AuthChecker><DetailProfile /></AuthChecker>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App