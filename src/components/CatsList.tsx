import React from 'react';
import 'antd/dist/reset.css';
import { Card, Meta } from 'antd';

const CatsList = () => {
  return (
    <>
      <Card hoverable style={{ width: 300 }} cover={<img alt="example" src="https://img.freepik.com/free-photo/cat-white-background_155003-20502.jpg?size=626&ext=jpg" s />}
      >
        <h2>Cats Adoption in The Pet Shelter</h2>
        <p>www.instagram.com </p>
      </Card>
    </>
  )
}

export default CatsList;