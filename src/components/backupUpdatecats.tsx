/*import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { api } from './common/http-common';
import axios from 'axios';

const UpdateCats: React.FC = () => {
  const [cats, setCats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedCats, setUpdatedCats] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(`${api.url}/cats`);
        setCats(response.data);
        setUpdatedCats(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching cats:', error);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const handleUpdateCat = (catId: number, newTitle: string, newAllText: string) => {
    const updateCatApiEndpoint = `${api.url}/cats/${catId}`;
    axios
      .put(updateCatApiEndpoint, { title: newTitle, alltext: newAllText })
      .then((response) => {
        const updatedCat = response.data;
        const updatedCatsCopy = [...updatedCats];
        const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === updatedCat.id);
        if (catIndex !== -1) {
          updatedCatsCopy[catIndex] = updatedCat;
          setUpdatedCats(updatedCatsCopy);
        }
      })
      .catch((error) => {
        console.log('Error updating cat:', error);
      });
  };

  const handleCancelUpdate = () => {
    setUpdatedCats(cats);
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  } else {
    if (!updatedCats) {
      return <div>There are no cats available now.</div>;
    } else {
      return (
        <div>
          <Row>
            {updatedCats.map(({ id, title, alltext }: any) => (
              <Col span={8} key={id}>
                <Card title={title} style={{ width: 300 }}>
                  <Input
                    value={title}
                    onChange={(e) => {
                      const updatedTitle = e.target.value;
                      const updatedCatsCopy = [...updatedCats];
                      const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === id);
                      if (catIndex !== -1) {
                        updatedCatsCopy[catIndex].title = updatedTitle;
                        setUpdatedCats(updatedCatsCopy);
                      }
                    }}
                  />
                  <Input.TextArea
                    value={alltext}
                    onChange={(e) => {
                      const updatedAllText = e.target.value;
                      const updatedCatsCopy = [...updatedCats];
                      const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === id);
                      if (catIndex !== -1) {
                        updatedCatsCopy[catIndex].alltext = updatedAllText;
                        setUpdatedCats(updatedCatsCopy);
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleUpdateCat(id, title, alltext)}
                    style={{ marginRight: '1rem' }}
                  >
                    Update
                  </Button>
                  <Button onClick={handleCancelUpdate}>Cancel</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  }
};

export default UpdateCats;
*/

/*import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { api } from './common/http-common';
import axios from 'axios';

const UpdateCats: React.FC = () => {
  const [cats, setCats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedCats, setUpdatedCats] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(`${api.url}/cats`);
        setCats(response.data);
        setUpdatedCats(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching cats:', error);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const handleUpdateCat = (catId: number, newTitle: string, newAllText: string) => {
    const updateCatApiEndpoint = `${api.url}/cats/${catId}`;
    axios
      .put(updateCatApiEndpoint, { title: newTitle, alltext: newAllText })
      .then((response) => {
        const updatedCat = response.data;
        const updatedCatsCopy = updatedCats ? [...updatedCats] : [];
        const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === updatedCat.id);
        if (catIndex !== -1) {
          updatedCatsCopy[catIndex] = updatedCat;
          setUpdatedCats(updatedCatsCopy);
        }
      })
      .catch((error) => {
        console.log('Error updating cat:', error);
      });
  };

  const handleCancelUpdate = (catId: number) => {
    const catIndex = updatedCats ? updatedCats.findIndex((cat) => cat.id === catId) : -1;
    if (catIndex !== -1) {
      const catsCopy = cats ? [...cats] : [];
      const cat = catsCopy.find((cat) => cat.id === catId);
      if (cat) {
        const { title, alltext } = cat;
        updatedCats[catIndex] = { id: catId, title, alltext };
        setUpdatedCats(updatedCats);
      }
    }
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  } else {
    if (!updatedCats) {
      return <div>There are no cats available now.</div>;
    } else {
      return (
        <div>
          <Row>
            {updatedCats.map(({ id, title, alltext }: any) => (
              <Col span={8} key={id}>
                <Card title={title} style={{ width: 300 }}>
                  <Input
                    value={title}
                    onChange={(e) => {
                      const updatedTitle = e.target.value;
                      const updatedCatsCopy = updatedCats ? [...updatedCats] : [];
                      const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === id);
                      if (catIndex !== -1) {
                        updatedCatsCopy[catIndex].title = updatedTitle;
                        setUpdatedCats(updatedCatsCopy);
                      }
                    }}
                  />
                  <Input.TextArea
                    value={alltext}
                    onChange={(e) => {
                      const updatedAllText = e.target.value;
                      const updatedCatsCopy = updatedCats ? [...updatedCats] : [];
                      const catIndex = updatedCatsCopy.findIndex((cat) => cat.id === id);
                      if (catIndex !== -1) {
                        updatedCatsCopy[catIndex].alltext = updatedAllText;
                        setUpdatedCats(updatedCatsCopy);
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleUpdateCat(id, title, alltext)}
                    style={{ marginRight: '1rem' }}
                  >
                    Update
                  </Button>
                  <Button onClick={() => handleCancelUpdate(id)}>Cancel</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  }
};

export default UpdateCats;*/