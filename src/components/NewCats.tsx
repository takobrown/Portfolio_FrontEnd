import React, { useState, ChangeEvent } from "react";
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input;

interface NewCatsProps {
  basicAuth: string;
}

const NewCats: React.FC<NewCatsProps> = ({ basicAuth }) => {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleFormSubmit = async () => {
    const postCats = {
      title,
      allText: context,
      imageBase64,
      postid: 1
    };

    try {
      await axios.post(`${api.url}/cats`, postCats, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
      });

      console.log("Cat posted successfully!");
    } catch (error) {
      console.error('Error creating cat:', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setImageBase64(null);
    }
  };

  const contentRules = [{ required: true, message: 'Please input something' }];

  return (
    <Form name="article" onFinish={handleFormSubmit}>
      <Form.Item name="title" label="Title" rules={contentRules}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item name="context" label="Context" rules={contentRules}>
        <TextArea rows={4} value={context} onChange={(e) => setContext(e.target.value)} />
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Input type="file" onChange={handleImageChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default NewCats;
