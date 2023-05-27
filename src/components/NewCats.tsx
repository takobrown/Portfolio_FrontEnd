/*import React from "react";
import { Form, Input, Button } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input

const NewCats = () => {
  const username = "alice";
  const password = "alice1234";
  // Create token by username:password
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  localStorage.setItem('atoken', access_token);
  
  const handleFormSubmit = (values: any) => {
    const t = values.title;
    const c = values.context;
    console.log(values, t, c);
    const postCats = {
      title: t,
      allText: c,
      authorID: 1
    }
    
    // Post request
    axios.post(`${api.url}/cats`, postCats, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`
      }
    }).then((res)=> {
      console.log(res.data);
    });
    
  }

  const contentRules = [
    {required: true, message: 'Please input somethings'}    
  ]
  
  return (
    <Form name="article" onFinish={(values)=>handleFormSubmit(values)}>
      <Form.Item name="title" label="Title" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="context" label="Context" rules={contentRules}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    
    </Form>
  )
}

export default NewCats;*/
import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input;

const NewCats = () => {
  const [image, setImage] = useState<File | null>(null); // State to store the uploaded image

  const username = "alice";
  const password = "alice1234";
  // Create token by username:password
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  localStorage.setItem('atoken', access_token);

  const handleFormSubmit = async (values: any) => {
    const t = values.title;
    const c = values.context;
    console.log(values, t, c);

    const formData = new FormData();
    formData.append('image', image!); // Append the image to the form data

    const postCats = {
      title: t,
      allText: c,
      authorID: 1
    };

    // Post request
    try {
      const response = await axios.post(`${api.url}/cats`, postCats, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });

      const catId = response.data.id;
      
      // Upload the image separately
      await axios.post(`${api.url}/cats/${catId}/upload`, formData, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Cat image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading cat image:', error);
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

  return (
    <Form name="article" onFinish={(values) => handleFormSubmit(values)}>
      <Form.Item name="title" label="Title" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="context" label="Context" rules={contentRules}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <input type="file" accept="image/*" onChange={handleImageUpload} /> {/* Add input element for image upload */}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default NewCats;

