//import './App.css'
import 'antd/dist/reset.css';
//import { Card, Button, DatePicker } from 'antd';
import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import CatsDetail from './components/CatsDetail';
import NewCats from './components/NewCats';
import UpdateCats from './components/UpdateCats';
import Login from './components/Login';
import NewUsers from './components/NewUsers';
import CatbreedApi from './components/CatbreedApi';

const { Header, Content, Footer } = Layout;
const logout = ()=>{
    localStorage.clear();
}
export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/newcats">New Cats</Link>
            <Link to="/login">Login</Link>
            <Link to="/newusers">Register</Link>
            <Link to="" onClick={logout}>Logout</Link>
            <Link to="/api">Cat Breeds</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/a/:aid" element={<CatsDetail />} />
          <Route path="/newcats" element={<NewCats />} />
          <Route path="/edit/:aid" element={<UpdateCats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newusers" element={<NewUsers />}/>
          <Route path="/api" element={<CatbreedApi />} />
        </Routes>
      </Content>
      <Footer>
        <p>@Copyright Reserved The Pet Shelter</p>
      </Footer>
    </Router>
  )
}