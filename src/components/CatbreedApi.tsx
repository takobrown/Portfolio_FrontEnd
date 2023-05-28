import React, { Component } from 'react';
import axios from 'axios';

/** Component to get and display the cat breeds via Cat API. */
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'DEMO-API-KEY';

interface CatBreed {
  id: string;
  name: string;
}

interface CatImage {
  url: string;
}

interface CatbreedApiState {
  images: CatImage[];
  breeds: CatBreed[];
  selected_catbreed: string;
}

class CatbreedApi extends Component<{}, CatbreedApiState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      images: [],
      breeds: [],
      selected_catbreed: '',
    };

    this.onBreedChange = this.onBreedChange.bind(this);
  }

  /** Get the cat breeds information. */
  async getBreeds() {
    const res = await axios.get('/breeds');
    return res.data as CatBreed[];
  }

  async getCatsImagesByBreed(catbreedsID: string, amounts: number) {
    const res = await axios.get(`/images/search?breed_ids=${catbreedsID}&limit=${amounts}`);
    console.table(res.data);
    return res.data as CatImage[];
  }

  async loadBreedImages() {
    console.log('Load Breed Images:', this.state.selected_catbreed);
    const breed_image = await this.getCatsImagesByBreed(this.state.selected_catbreed, 5);
    this.setState({ images: breed_image });
  }

  async onBreedChange(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log('Breed Selected. ID:', e.target.value);
    await this.setState({ selected_catbreed: e.target.value });
    await this.loadBreedImages();
  }

  componentDidMount() {
    if (this.state.breeds.length === 0) {
      this.getBreeds()
        .then((breeds) => this.setState({ breeds }))
        .catch((error) => console.error(error));
    }
  }

  /** Display the cat breeds selection interface. */
  render() {
    return (
      <div>
        <div>
          <h2>
            <select
              style={{ textAlign: 'center', fontSize: 20 }}
              value={this.state.selected_catbreed}
              onChange={this.onBreedChange}
            >
              {this.state.breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </h2>
        </div>
        <div>
          {this.state.images.map((image) => (
            <img className="catImage" alt="" src={image.url} width="240" height="180" key={image.url} />
          ))}
        </div>
      </div>
    );
  }
}

export default CatbreedApi;
