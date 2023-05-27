//import './App.css'
import 'antd/dist/reset.css';
//import { Card, Button, DatePicker } from 'antd';
import { Layout, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import CatsDetail from './components/CatsDetail';
import NewCats from './components/NewCats';
import NewUsers from './components/NewUsers';



const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/newcats">New Cats</Link>
            <Link to="/newusers">Register</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/a/:aid" element={<CatsDetail />} />
          <Route path="/newcats" element={<NewCats />} />
          <Route path="/newUsers" element={<NewUsers />} />
        </Routes>
      </Content>
      <Footer>
        <p>@Copyright Reserved The Pet Shelter</p>
      </Footer>
    </Router>
  )
}
