import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input;

const NewCats = () => {
  const [image, setImage] = useState<File | null>(null); // State to store the uploaded image

  //const username = "alice";
  //const password = "alice1234";


  /* Create token by username:password
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  localStorage.setItem('atoken', access_token);*/
              
  const handleFormSubmit = async (values: any) => {
    
    const t = values.title;
    const c = values.context;

    console.log(values, t, c);


    const postCats = {
      title: t,
      allText: c,
      postid: 1
    };

    // Post request
  /*  try {
      const response = await axios.post(`${api.url}/cats`, postCats, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });
    }
      const catId = response.data.id;
  }*/
      try {
     await  axios.post(`${api.url}/cats`, postCats, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
    
  
  const contentRules = [
    { required: true, message: 'Please input something' }
  ];

 
  return (
    <Form name="article" onFinish={(values) => handleFormSubmit(values)}>
      <Form.Item name="title" label="Name" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="context" label="Sex" rules={contentRules}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default NewCats;

