import React, { useState } from "react";
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
      setLoggedIn(true);

      message.success('Login successful!');
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
        email: values.email,
        avatarurl: values.avatarurl
      };

      await axios.put(`${api.url}/users`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('atoken')}`
        }
      });

      setUserData(updatedUser);
      message.success('User record updated successfully!');
    } catch (error) {
      console.error('Error updating user record:', error);
      message.error('Failed to update user record!');
    }
  };

  const handleDeleteUserRecord = async () => {
    try {
      await axios.delete(`${api.url}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('atoken')}`
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
    { required: true, message: 'Please enter your username' },
    { required: true, message: 'Please enter your password' }
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
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      ) : (
        <Form name="update" onFinish={handleFormSubmit} initialValues={userData}>
          <Form.Item name="username" label="Username" rules={loginRules}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={loginRules}>
            <Input.Password disabled />
          </Form.Item>
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
            <Button type="danger" onClick={handleDeleteUserRecord}>Delete User Record</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Login;
