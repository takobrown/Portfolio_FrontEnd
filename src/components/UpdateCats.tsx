import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input;

const UpdateCats = () => {
  const [image, setImage] = useState<File | null>(null); // State to store the uploaded image
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleFormSubmit = async (values: any) => {
    const { title, allText, summary } = values;
    const formData = new FormData();

    if (image) {
      formData.append('image', image); // Append the image to the form data
    }

    try {
      const response = await axios.put(`${api.url}/cats`, {
        title,
        allText,
        summary,
        imageUrl: formData.get('image') ? `${api.url}/upload` : undefined
      }, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });

      console.log('Cat updated successfully!', response.data);
      message.success('Cat updated successfully!');
    } catch (error) {
      console.error('Error updating cat:', error);
      message.error('Error updating cat');
    }
  };

  const contentRules = [
    { required: true, message: 'Please input something' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('atoken');
    setIsLoggedIn(false);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${api.url}/users/login`, {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('atoken', token);
      setIsLoggedIn(true);
      message.success('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Invalid username or password');
    }
  };

  const handleLoginFormSubmit = (values: any) => {
    const { username, password } = values;
    handleLogin(username, password);
  };

  // Check if user is logged in
  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please login to access this page.</h1>
        <Form name="login" onFinish={handleLoginFormSubmit}>
          <Form.Item name="username" label="Username" rules={contentRules}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={contentRules}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
      <Form name="article" onFinish={handleFormSubmit}>
        <Form.Item name="title" label="Title" rules={contentRules}>
          <Input />
        </Form.Item>
        <Form.Item name="allText" label="All Text" rules={contentRules}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="summary" label="Summary" rules={contentRules}>
          <Input />
        </Form.Item>
        <Form.Item>
          <input type="file" accept="image/*" onChange={handleImageUpload} /> {/* Add input element for image upload */}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCats;
