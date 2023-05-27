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


const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to ="/">Home</Link>
            <Link to ="/dashboard">Dashboard</Link>
           <Link to ="/about">About</Link>
            <Link to ="/newcats">New Cats</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element = { <Home />} />
          <Route path = "/dashboard" element = { <Dashboard />} />
          <Route path = "/about" element = { <About />} />
          <Route path = "/a/:aid" element = { <CatsDetail />} />
          <Route path = "/newcats" element = { <NewCats />} />
        </Routes>
      </Content>
      <Footer>
        <p>@Copyright Reserved The Pet Shelter</p>
      </Footer>
    </Router>
  )
  
}


/*import React, { useState } from 'react';
import { Layout, Space, Input, Button } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { api } from './components/common/http-common';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import CatsDetail from './components/CatsDetail';
import NewCats from './components/NewCats';
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [filteredCats, setFilteredCats] = useState([]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleFilter = async () => {
    try {
      // Make an API call to fetch the list of cats
      const response = await axios.get(`${api.url}/cats`);
      const cats = response.data;

      // Filter the list of cats based on the searchText
      const filteredList = cats.filter((cat: { title: string }) =>
        cat.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilteredCats(filteredList);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };
  return (
    <Router>
      <Layout>
        <Header>
          <nav>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">About</Link>
              <Link to="/newcats">New Cats</Link>
              <Search
                placeholder="Search cats"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleFilter}
              />
              <Button onClick={handleFilter}>Filter</Button>
            </Space>
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route
              index
              element={<Home searchText={searchText} filteredCats={filteredCats} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/a/:aid" element={<CatsDetail />} />
            <Route path="/newcats" element={<NewCats />} />
          </Routes>
        </Content>
        <Footer>
          <p>@Copyright Reserved The Pet Shelter</p>
        </Footer>
      </Layout>
    </Router>
  );
}*/
