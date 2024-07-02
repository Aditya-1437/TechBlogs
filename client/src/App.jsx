import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footerc from './components/Footer';
import PrivsteRoute from './components/PrivsteRoute';
import OnlyAdminPrivsteRoute from './components/OnlyAdminPrivsteRoute.jsx';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route element={<PrivsteRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivsteRoute />} >
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
    <Footerc />
    </BrowserRouter>
  )
}
