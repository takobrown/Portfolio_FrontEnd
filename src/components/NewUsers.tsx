import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';

const NewUsers = () => {
  const handleFormSubmit = async (values: any) => {
    const { username, password, email, signupcode, permission } = values;

    if (!username || !password || !email || !signupcode) {
      message.error('Please fill in all the required fields');
      return;
    }

    if (signupcode !== 'pet') {
       message.error('You are not allowed to register an account. Try Again or Leave it!');
      return;
    }

    try {
      await axios.post(`${api.url}/users`, {
        ...values
      });
      message.success('Successful! Go to "Login" page to login.');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Form name="newUser" onFinish={handleFormSubmit} initialValues={{ permission:'1' }}>
      <Form.Item name="firstname" label="First Name">
        <Input />
      </Form.Item>
      <Form.Item name="lastname" label="Last Name">
        <Input />
      </Form.Item>
      <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Username cannot be empty!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password cannot be empty!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Email cannot be empty' }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item name="avatarurl" label="Avatar URL">
        <Input />
      </Form.Item>
      <Form.Item name="permission" hidden label="permission">
        <Input />
      </Form.Item>
      <Form.Item name="signupcode" label="Sign-up Code" rules={[{ required: true, message: 'Sign-up Code can be got from your supervisor.' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default NewUsers;

