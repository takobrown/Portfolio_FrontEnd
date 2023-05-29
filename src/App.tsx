/*import 'antd/dist/reset.css';
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
}*/

/*import React, { useState } from 'react';
import 'antd/dist/reset.css';
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

enum PermissionLevel {
  Guest = 0,
  Staff = 1,
}

export default function App() {
  
 const [permission, setPermission] = useState(PermissionLevel.Guest);

  const handleLogin = () => {
    setPermission(PermissionLevel.Staff);
   };

  const handleLogout = () => {
    // Perform logout logic using user's API
    // Set the permission level back to guest after successful logout
    setPermission(PermissionLevel.Guest);
    localStorage.clear();
  };


  
  return (
    <Router>
      <Layout>
        <Header>
          <nav>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              {permission === PermissionLevel.Staff && (
                <>
                  <Link to="/newcats">New Cats</Link>
                  <Link to="/api">Cat Breeds</Link>
                </>
              )}
              {permission === PermissionLevel.Guest && (
                <>
                  <Link to="" onClick={handleLogin}>Login</Link>
                  <Link to="/newusers">Register</Link>
                </>
              )}
              <Link to="" onClick={handleLogout}>Logout</Link>
            </Space>
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {permission === PermissionLevel.Staff && (
              <>
                <Route path="/newcats" element={<NewCats />} />
                <Route path="/api" element={<CatbreedApi />} />
              </>
            )}
            <Route path="/a/:aid" element={<CatsDetail />} />
            <Route path="/edit/:aid" element={<UpdateCats />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/newusers" element={<NewUsers />} />
          </Routes>
        </Content>
        <Footer>
          <p>&copy; The Pet Shelter</p>
        </Footer>
      </Layout>
    </Router>
  );
}*/
import React, { useState } from 'react';
import 'antd/dist/reset.css';
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

enum PermissionLevel {
  Guest = 0,
  Staff = 1,
}
  function refresh() {
  window.location.reload(false);
}
export default function App() {
  const permissionValue = parseInt(localStorage.getItem('per') || '0', 10);
  const permission = permissionValue === 1 ? PermissionLevel.Staff : PermissionLevel.Guest;

  const handleLogin = () => {
   // localStorage.setItem('per', '1');
    window.location.reload(); // Refresh the page to reflect the updated permission
  };

  const handleLogout = () => {
   // localStorage.setItem('per', '0');
  localStorage.clear()
     window.location.reload(); // Refresh the page to reflect the updated permission
  };

  let links;
  if (permission === PermissionLevel.Staff) {
    links = (
      <>
        <Link to="/newcats">New Cats</Link>
        <Link to="/api">Cat Breeds</Link>
      </>
    );
  } else {
    links = (
      <>
         <Link to="/login" >Login</Link>
        <Link to="/newusers">Register</Link>
      </>
    );
  }

  return (
    <Router>
      <Layout>
        <Header>
          <nav>
            <Space>
              <Link to="/" >Home</Link>
              {links}
              <Link to="" onClick={handleLogout}>Logout</Link>
            </Space>
          </nav>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {permission === PermissionLevel.Staff && (
              <>
                <Route path="/newcats" element={<NewCats />} />
                <Route path="/api" element={<CatbreedApi />} />
              </>
            )}
            <Route path="/a/:aid" element={<CatsDetail />} />
            <Route path="/edit/:aid" element={<UpdateCats />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newusers" element={<NewUsers />} />
          </Routes>
        </Content>
        <Footer>
          <p>&copy; The Pet Shelter</p>
        </Footer>
      </Layout>
    </Router>
  );
}
