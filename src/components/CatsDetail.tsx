import React from 'react';
import cats from './cats.json';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from "axios";
import { api } from './common/http-common';

const CatsDetail = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const delete1 =(id: any) => {
      axios.delete(`${api.url}/cats/${id}`, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('atoken')}`
        }
          });
  }

  const selectedCat = cats.find((cat) => cat.id === +aid);

  if (selectedCat) {
    return (
      <>
        <h1>{selectedCat.title}</h1>
        <p>{selectedCat.fullText}</p>
        <Button type="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
          <Button type="primary" onClick={() => delete1(aid)}>
          Delete
        </Button>
         <Button type="primary" href={`/edit/${aid}`}>
          Edit
        </Button>
      </>
      
    );
  } else {
    return <p>Local Store: {localStorage.getItem('atoken')}</p>;
  }
};

export default CatsDetail;
