import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin, Input, Button } from 'antd';
//import cats from './cats.json';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';


const Cats = () => {
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(`${api.url}/cats`);
        setCats(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching cats:', error);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const handleSearch = () => {
    // Filter the cats based on the search term
    const filteredCats = cats?.filter(cat =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.alltext.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCats(filteredCats);
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  } else {
    if (!cats) {
      return <div>There are no cats available now.</div>;
    } else {
      return (
        <div>
          <Input
            placeholder="Search cats"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            Search
          </Button>
          <Row>
            {cats.map(({ id, title, alltext}) => (
              <Col span={8} key={id}>
                <Card title={title} style={{ width: 300 }}>
                  <p>{alltext}</p>
                  <p></p>
                  <Link to={`/a/${id}`}>Details</Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  }
};

export default Cats;
