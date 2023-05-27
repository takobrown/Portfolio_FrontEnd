import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { Buffer } from 'buffer';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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

  const handleCreateUser = async (values: any) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        avatarurl: values.avatarurl
      };

      await axios.post(`${api.url}/users`, newUser);

      message.success('User account created successfully!');
    } catch (error) {
      console.error('Error creating user account:', error);
      message.error('Failed to create user account!');
    }
  };

  const handleUpdateUserRecord = async (values: any) => {
    try {
      const updatedUser = {
        username: values.username,
        password: values.password,
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        avatarurl: values.avatarurl
      };

      await axios.put(`${api.url}/users`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('atoken')}`
        }
      });

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

  const handleFormSubmit = (values: any) => {
    if (loggedIn) {
      handleUpdateUserRecord(values);
    } else {
      handleCreateUser(values);
    }
  };

  const loginRules = [
    { required: true, message: 'Cannot be empty!' },
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
          <Form.Item name="email" label="Email" rules={loginRules}>
            <Input />
          </Form.Item>
          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Create User Account</Button>
            <Button onClick={handleLogin}>Login</Button>
          </Form.Item>
        </Form>
      ) : (
        <Form name="update" onFinish={handleFormSubmit}>
          <Form.Item name="username" label="Username" rules={loginRules}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={loginRules}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={loginRules}>
            <Input />
          </Form.Item>
          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
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
