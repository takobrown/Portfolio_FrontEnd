import React, { useState,useEffect  } from "react";
import { Form, Input, Button, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { Buffer } from 'buffer';

interface UserData {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  avatarurl: string;
}


const Login: React.FC = () => {
const [loggedIn, setLoggedIn] = useState(false);
  const [logindata, setLoginData] = React.useState('')
 const loginOk = (localStorage.getItem('atoken') !== null);
  function refresh() {
  window.location.reload(false);
}
  const loginOOk =()=>{

  
 useEffect(() => {
      setLoggedIn(true); 
  }, []);
 }



  
if(loginOk){
  loginOOk()
}
  const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);
  const [id, setId] = React.useState('')
    const [permission, setPermission] = React.useState('')
   
  const [userData, setUserData] = useState<UserData>({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    avatarurl: ''
  });



 
  const handleLogin = async (values: any) => {
    try {
      const access_token = Buffer.from(`${values.username}:${values.password}`, 'utf8').toString('base64');
      localStorage.setItem('atoken', access_token);

      // setLoggedIn(true);
      await axios.get(`${api.url}/private`, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      }).then((res) => {

        axios.get(`${api.url}/users/${values.username}`
        ).then((res: any) => {
          setId(localStorage.setItem("userid", res.data[0].id))
          setPermission(localStorage.setItem("per", res.data[0].permission))
           localStorage.setItem("username", res.data[0].username)
          console.log(localStorage.getItem("userid")) 
        }).then((res) => {
         // setLoginData(res.data)
           refresh()
          /*  localStorage.setItem('userid', res.data[0].id);
            setId(localStorage.getItem('userid'))
            console.log(localStorage.getItem('userid')) */
        // setLoginData(res.data)
           setLoggedIn(true);  
           message.success('Login successful!');
        
        })
 
      })
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Failed to login!');
    }
  };


  const handleUpdateUserRecord = async (values: UserData) => {
    try {
      const updatedUser: UserData = {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
        email: values.email,
        avatarurl: values.avatarurl,
      };

      await axios.put(`${api.url}/users/${localStorage.getItem("userid")}`, updatedUser, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });

      setUserData(updatedUser);
      message.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user record:', error);
      message.error('Failed to update user record!');
    }
  };

  const handleDeleteUserRecord = async () => {
    try {
      await axios.delete(`${api.url}/users/${localStorage.getItem("userid")}`, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });

      setLoggedIn(false);
      setUserData({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        avatarurl: ''
      });

      message.success('User record deleted successfully!');
    } catch (error) {
      console.error('Error deleting user record:', error);
      message.error('Failed to delete user record!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('atoken');
    setLoggedIn(false);
    message.success('Logout successful!');
  };

  const handleFormSubmit = (values: UserData) => {
    if (loggedIn) {
      handleUpdateUserRecord(values);
    } else {
      handleLogin(values);
    }
  };

  const loginRules = [
    { required: true, message: 'Cannot be empty!' }
  ];

  return (
    <div>
      {!loggedIn ? (
        <Form name="login" onFinish={handleFormSubmit}>
          <Form.Item name="username" label="Username" rules={loginRules}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={loginRules}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >Login</Button>
          </Form.Item>
        </Form>
      ) : (
        <Form name="update" onFinish={handleFormSubmit} initialValues={userData}>

          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="avatarurl" label="Avatar URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update User Record</Button>
            <Button type="primary" danger onClick={handleDeleteUserRecord}>Delete User Record</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Login;
