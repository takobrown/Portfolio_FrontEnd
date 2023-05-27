import React from 'react';
import cats from './cats.json';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const CatsDetail = () => {
  const { aid } = useParams();
  const navigate = useNavigate();

  const selectedCat = cats.find((cat) => cat.id === +aid);

  if (selectedCat) {
    return (
      <>
        <h1>{selectedCat.title}</h1>
        <p>{selectedCat.fullText}</p>
        <Button type="primary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </>
    );
  } else {
    return <p>Local Store: {localStorage.getItem('atoken')}</p>;
  }
};

export default CatsDetail;
